'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validators = function () {
    function Validators(params) {
        _classCallCheck(this, Validators);

        this.params = params;
        this.attachSizeLimit = {
            megabytes: 10,
            bytes: 10 * 1024 * 1024
        };
        this.batchMinSize = 2;
        this.batchMinTime = 5;
        this.totalEmailLimit = 500;
    }

    _createClass(Validators, [{
        key: 'validateRecipients',
        value: function validateRecipients() {
            _lodash2.default.forEach(this.params.recipientList, function (recipient) {
                if (Validators.isEmailFormatInvalid(recipient)) {
                    throw new _exceptions.InvalidFormatRecipientList();
                }
                if (Validators.isEmailInvalid(recipient)) {
                    throw new _exceptions.InvalidRecipientList(recipient);
                }
            });

            var batchs = this.attrInParams('batchs') ? this.params.batchs : null;
            var totalRecipients = this.params.recipientList.length;
            if (batchs === null && this.attrNotInHeaders('systemTakesOverBatchs') && totalRecipients > this.totalEmailLimit) {
                throw new _exceptions.BatchIsRequired(totalRecipients);
            }
        }
    }, {
        key: 'validadeFrom',
        value: function validadeFrom() {
            if (Validators.isEmailFormatInvalid(this.params.from)) {
                throw new _exceptions.InvalidFromFormat();
            }
            if (Validators.isEmailInvalid(this.params.from)) {
                throw new _exceptions.InvalidFrom();
            }
        }
    }, {
        key: 'validateSendAt',
        value: function validateSendAt() {
            if (_lodash2.default.has(this.params, 'sendAt') && this.params.sendAt) {
                if (!(0, _moment2.default)(this.params.sendAt, ['YYYY-MM-DD HH:mm:ss'], true).isValid()) {
                    throw new _exceptions.InvalidSendAt();
                }
            }
        }
    }, {
        key: 'validateAttachments',
        value: function validateAttachments() {
            var _this = this;

            if (!_lodash2.default.isArray(this.params.attachments)) throw new _exceptions.AttachmentsShouldBeList();
            var totalAttachmentsSize = 0;
            _lodash2.default.forEach(this.params.attachments, function (attachment) {
                if (!_lodash2.default.isObject(attachment)) throw new _exceptions.AttachmentShouldBeObject();
                if (!_lodash2.default.has(attachment, 'name') || !attachment.name || attachment.name === '') {
                    throw new _exceptions.AttachmentShouldHaveName();
                }
                if (!_lodash2.default.has(attachment, 'file') || !attachment.file || attachment.file === '') {
                    throw new _exceptions.AttachmentShouldHaveFile();
                }
                var dfile = null;
                try {
                    dfile = (0, _atob2.default)(attachment.file);
                } catch (e) {
                    throw new _exceptions.AttachmentFileShouldBeBase64();
                }
                var fileSize = dfile.length;
                if (fileSize > _this.attachSizeLimit.bytes) {
                    var diff = fileSize - _this.attachSizeLimit.bytes;
                    throw new _exceptions.AttachmentSizeLimit(_this.attachSizeLimit.megabytes, attachment.name, diff);
                }
                totalAttachmentsSize += fileSize;
            });
            if (totalAttachmentsSize > this.attachSizeLimit.bytes) {
                var diff = totalAttachmentsSize - this.attachSizeLimit.bytes;
                throw new _exceptions.AttachmentsSizeLimit(this.attachSizeLimit.megabytes, diff);
            }
        }
    }, {
        key: 'validateBatchsArgs',
        value: function validateBatchsArgs() {
            if (this.attrInParams('batchs') || this.attrInParams('timeBetweenBatchs')) {
                if (this.attrNotInParams('batchs') && this.attrNotInHeaders('systemTakesOverBatchs')) {
                    throw new _exceptions.InvalidBatch();
                }
                if (!_lodash2.default.isNumber(this.params.batchs) && this.attrNotInHeaders('systemTakesOverBatchs')) {
                    throw new _exceptions.InvalidBatch();
                }
                if (this.attrNotInParams('timeBetweenBatchs')) throw new _exceptions.InvalidTimeBetweemBatchs();
                if (!_lodash2.default.isNumber(this.params.timeBetweenBatchs)) throw new _exceptions.InvalidTimeBetweemBatchs();
                if (this.params.batchs < this.batchMinSize && this.attrNotInHeaders('systemTakesOverBatchs')) {
                    throw new _exceptions.BatchLowerThan2();
                }
                if (this.params.timeBetweenBatchs < this.batchMinTime) {
                    throw new _exceptions.TimeBetweemBatchsLessThan5();
                }
                var batchs = _lodash2.default.floor(this.params.batchs);
                var tempTime = _lodash2.default.floor(this.params.timeBetweenBatchs);
                var timeBetweenBatchs = this.batchMinTime * _lodash2.default.floor(tempTime / this.batchMinTime);

                if (batchs < this.batchMinSize && this.attrNotInHeaders('systemTakesOverBatchs')) {
                    throw new _exceptions.InvalidBatch();
                }
                if (timeBetweenBatchs < this.batchMinTime) throw new _exceptions.InvalidTimeBetweemBatchs();
                this.params.batchs = batchs;
                this.params.timeBetweenBatchs = timeBetweenBatchs;

                if (this.attrNotInHeaders('systemTakesOverBatchs')) {
                    var totalRecipients = this.params.recipientList.length;
                    var batchsSize = _lodash2.default.floor(totalRecipients / this.params.batchs);

                    if (batchsSize > this.totalEmailLimit) {
                        throw new _exceptions.BatchSizeLimit(this.totalEmailLimit);
                    }
                    if (batchsSize * batchs !== totalRecipients) {
                        throw new _exceptions.BatchDistributionInvalid();
                    }
                }
            }
        }
    }, {
        key: 'attrNotInParams',
        value: function attrNotInParams(attr) {
            return !_lodash2.default.has(this.params, attr) || !this.params[attr];
        }
    }, {
        key: 'attrInParams',
        value: function attrInParams(attr) {
            return _lodash2.default.has(this.params, attr) && this.params[attr];
        }
    }, {
        key: 'attrNotInHeaders',
        value: function attrNotInHeaders(attr) {
            if (this.attrNotInParams('headers')) return true;
            return !_lodash2.default.has(this.params.headers, attr) || !this.params.headers[attr];
        }
    }, {
        key: 'attrInHeaders',
        value: function attrInHeaders(attr) {
            if (this.attrNotInParams('headers')) return false;
            return _lodash2.default.has(this.params.headers, attr) && this.params.headers[attr];
        }
    }, {
        key: 'checkMailParams',
        value: function checkMailParams() {
            if (!_lodash2.default.isObject(this.params)) throw new _exceptions.ParamsShouldBeObject();
            if (this.attrNotInParams('from') && this.attrNotInParams('useTplDefaultEmail')) {
                throw new _exceptions.NoReplyEmail();
            }
            if (this.attrInParams('from')) this.validadeFrom();
            if (this.attrNotInParams('recipientList')) throw new _exceptions.NoRecipient();
            if (!_lodash2.default.isArray(this.params.recipientList)) throw new _exceptions.NoRecipient();
            if (!this.params.recipientList.length) throw new _exceptions.NoRecipient();
            this.validateBatchsArgs();
            this.validateRecipients();
            this.validateSendAt();

            if (this.attrNotInParams('subject') && this.attrNotInParams('useTplDefaultSubject')) {
                throw new _exceptions.NoSubject();
            }
            if ((this.attrInParams('useTplDefaultSubject') || this.attrInParams('useTplDefaultName') || this.attrInParams('useTplDefaultEmail')) && this.attrNotInParams('templateSlug')) {
                throw new _exceptions.NoTemplateNoFeatures();
            }
            if (this.attrInParams('attachments')) this.validateAttachments();
        }
    }, {
        key: 'checkSearchParams',
        value: function checkSearchParams() {
            if (!_lodash2.default.isObject(this.params)) throw new _exceptions.ParamsShouldBeObject();
            if (this.attrNotInParams('start')) throw new _exceptions.NoParamX('start');
            if (this.attrNotInParams('end')) throw new _exceptions.NoParamX('end');
            if (this.attrNotInParams('appIds')) throw new _exceptions.NoParamX('appIds');
            if (!_lodash2.default.isArray(this.params.appIds)) throw new _exceptions.WrongTypeParamX('Array', 'appIds');
        }
    }], [{
        key: 'trackEmail',
        value: function trackEmail(text) {
            var TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
            var tracked = text.match(TRACK_EMAIL_REGEX);
            return tracked ? tracked[0] : null;
        }
    }, {
        key: 'isEmailFormatInvalid',
        value: function isEmailFormatInvalid(text) {
            var email = Validators.trackEmail(text);
            return email === null;
        }
    }, {
        key: 'isEmailInvalid',
        value: function isEmailInvalid(text) {
            var EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi;
            var email = Validators.trackEmail(text);
            var result = email.match(EMAIL_REGEX);
            return result === null;
        }
    }]);

    return Validators;
}();

exports.default = Validators;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsImJhdGNoTWluU2l6ZSIsImJhdGNoTWluVGltZSIsInRvdGFsRW1haWxMaW1pdCIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEZvcm1hdEludmFsaWQiLCJpc0VtYWlsSW52YWxpZCIsImJhdGNocyIsImF0dHJJblBhcmFtcyIsInRvdGFsUmVjaXBpZW50cyIsImxlbmd0aCIsImF0dHJOb3RJbkhlYWRlcnMiLCJmcm9tIiwiaGFzIiwic2VuZEF0IiwiaXNWYWxpZCIsImlzQXJyYXkiLCJhdHRhY2htZW50cyIsInRvdGFsQXR0YWNobWVudHNTaXplIiwiYXR0YWNobWVudCIsImlzT2JqZWN0IiwibmFtZSIsImZpbGUiLCJkZmlsZSIsImUiLCJmaWxlU2l6ZSIsImRpZmYiLCJhdHRyTm90SW5QYXJhbXMiLCJpc051bWJlciIsInRpbWVCZXR3ZWVuQmF0Y2hzIiwiZmxvb3IiLCJ0ZW1wVGltZSIsImJhdGNoc1NpemUiLCJhdHRyIiwiaGVhZGVycyIsInZhbGlkYWRlRnJvbSIsInZhbGlkYXRlQmF0Y2hzQXJncyIsInZhbGlkYXRlUmVjaXBpZW50cyIsInZhbGlkYXRlU2VuZEF0IiwidmFsaWRhdGVBdHRhY2htZW50cyIsImFwcElkcyIsInRleHQiLCJUUkFDS19FTUFJTF9SRUdFWCIsInRyYWNrZWQiLCJtYXRjaCIsImVtYWlsIiwidHJhY2tFbWFpbCIsIkVNQUlMX1JFR0VYIiwicmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUE2QnFCQSxVO0FBQ2pCLHdCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGFBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLGVBQUwsR0FBdUI7QUFD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QUwsRUFBb0MsTUFBTSxnQ0FBb0IsT0FBcEIsRUFBNkIsUUFBN0IsQ0FBTjtBQUN2Qzs7O21DQXpLaUJDLEksRUFBTTtBQUNwQixnQkFBTUMsb0JBQW9CLHNEQUExQjtBQUNBLGdCQUFNQyxVQUFVRixLQUFLRyxLQUFMLENBQVdGLGlCQUFYLENBQWhCO0FBQ0EsbUJBQU9DLFVBQVVBLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBQTlCO0FBQ0g7Ozs2Q0FDMkJGLEksRUFBTTtBQUM5QixnQkFBTUksUUFBUW5ELFdBQVdvRCxVQUFYLENBQXNCTCxJQUF0QixDQUFkO0FBQ0EsbUJBQU9JLFVBQVUsSUFBakI7QUFDSDs7O3VDQUNxQkosSSxFQUFNO0FBQ3hCLGdCQUFNTSxjQUFjLG9EQUFwQjtBQUNBLGdCQUFNRixRQUFRbkQsV0FBV29ELFVBQVgsQ0FBc0JMLElBQXRCLENBQWQ7QUFDQSxnQkFBTU8sU0FBU0gsTUFBTUQsS0FBTixDQUFZRyxXQUFaLENBQWY7QUFDQSxtQkFBT0MsV0FBVyxJQUFsQjtBQUNIOzs7Ozs7a0JBekJnQnRELFUiLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIEludmFsaWRGcm9tLFxuICAgIEludmFsaWRCYXRjaCxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgSW52YWxpZFNlbmRBdCxcbiAgICBCYXRjaFNpemVMaW1pdCxcbiAgICBCYXRjaExvd2VyVGhhbjIsXG4gICAgQmF0Y2hJc1JlcXVpcmVkLFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBJbnZhbGlkRnJvbUZvcm1hdCxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIEF0dGFjaG1lbnRzU2l6ZUxpbWl0LFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0LFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEludmFsaWRUaW1lQmV0d2VlbUJhdGNocyxcbiAgICBCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQsXG4gICAgVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUsXG4gICAgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QsXG4gICAgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCxcbn0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdG9ycyB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLmF0dGFjaFNpemVMaW1pdCA9IHtcbiAgICAgICAgICAgIG1lZ2FieXRlczogMTAsXG4gICAgICAgICAgICBieXRlczogMTAgKiAxMDI0ICogMTAyNCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5iYXRjaE1pblNpemUgPSAyO1xuICAgICAgICB0aGlzLmJhdGNoTWluVGltZSA9IDU7XG4gICAgICAgIHRoaXMudG90YWxFbWFpbExpbWl0ID0gNTAwO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhY2tFbWFpbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFRSQUNLX0VNQUlMX1JFR0VYID0gLyhbYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS5fLV0rXFwuW2EtekEtWjAtOS5fLV0rKS9naTtcbiAgICAgICAgY29uc3QgdHJhY2tlZCA9IHRleHQubWF0Y2goVFJBQ0tfRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gdHJhY2tlZCA/IHRyYWNrZWRbMF0gOiBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNFbWFpbEZvcm1hdEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGVtYWlsID09PSBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNFbWFpbEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBFTUFJTF9SRUdFWCA9IC9eW2EtekEtWjAtOV8uKy1dK0BbYS16QS1aMC05LV0rXFwuW2EtekEtWjAtOS0uXSskL2dpO1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZW1haWwubWF0Y2goRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsO1xuICAgIH1cbiAgICB2YWxpZGF0ZVJlY2lwaWVudHMoKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0LCAocmVjaXBpZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNpcGllbnRMaXN0KHJlY2lwaWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJhdGNocyA9IHRoaXMuYXR0ckluUGFyYW1zKCdiYXRjaHMnKSA/IHRoaXMucGFyYW1zLmJhdGNocyA6IG51bGw7XG4gICAgICAgIGNvbnN0IHRvdGFsUmVjaXBpZW50cyA9IHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoO1xuICAgICAgICBpZiAoYmF0Y2hzID09PSBudWxsXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJbkhlYWRlcnMoJ3N5c3RlbVRha2VzT3ZlckJhdGNocycpXG4gICAgICAgICAgICAmJiB0b3RhbFJlY2lwaWVudHMgPiB0aGlzLnRvdGFsRW1haWxMaW1pdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoSXNSZXF1aXJlZCh0b3RhbFJlY2lwaWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYWRlRnJvbSgpIHtcbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEZvcm1hdEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbUZvcm1hdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHRoaXMucGFyYW1zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZyb20oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZVNlbmRBdCgpIHtcbiAgICAgICAgaWYgKF8uaGFzKHRoaXMucGFyYW1zLCAnc2VuZEF0JykgJiYgdGhpcy5wYXJhbXMuc2VuZEF0KSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudCh0aGlzLnBhcmFtcy5zZW5kQXQsIFsnWVlZWS1NTS1ERCBISDptbTpzcyddLCB0cnVlKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlbmRBdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlQXR0YWNobWVudHMoKSB7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzKSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0KCk7XG4gICAgICAgIGxldCB0b3RhbEF0dGFjaG1lbnRzU2l6ZSA9IDA7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5hdHRhY2htZW50cywgKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhdHRhY2htZW50KSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnbmFtZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICdmaWxlJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5maWxlXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5maWxlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRmaWxlID0gYXRvYihhdHRhY2htZW50LmZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IGRmaWxlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmaWxlU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGZpbGVTaXplIC0gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXM7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaXplTGltaXQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgYXR0YWNobWVudC5uYW1lLCBkaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsQXR0YWNobWVudHNTaXplICs9IGZpbGVTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRvdGFsQXR0YWNobWVudHNTaXplID4gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB0b3RhbEF0dGFjaG1lbnRzU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2l6ZUxpbWl0KHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgZGlmZik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVCYXRjaHNBcmdzKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2JhdGNocycpIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd0aW1lQmV0d2VlbkJhdGNocycpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2JhdGNocycpICYmIHRoaXMuYXR0ck5vdEluSGVhZGVycygnc3lzdGVtVGFrZXNPdmVyQmF0Y2hzJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEJhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wYXJhbXMuYmF0Y2hzKSAmJiB0aGlzLmF0dHJOb3RJbkhlYWRlcnMoJ3N5c3RlbVRha2VzT3ZlckJhdGNocycpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRCYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCd0aW1lQmV0d2VlbkJhdGNocycpKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgICAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMpKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuYmF0Y2hzIDwgdGhpcy5iYXRjaE1pblNpemVcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJbkhlYWRlcnMoJ3N5c3RlbVRha2VzT3ZlckJhdGNocycpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoTG93ZXJUaGFuMigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLnRpbWVCZXR3ZWVuQmF0Y2hzIDwgdGhpcy5iYXRjaE1pblRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJhdGNocyA9IF8uZmxvb3IodGhpcy5wYXJhbXMuYmF0Y2hzKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBUaW1lID0gXy5mbG9vcih0aGlzLnBhcmFtcy50aW1lQmV0d2VlbkJhdGNocyk7XG4gICAgICAgICAgICBjb25zdCB0aW1lQmV0d2VlbkJhdGNocyA9IHRoaXMuYmF0Y2hNaW5UaW1lICogXy5mbG9vcih0ZW1wVGltZSAvIHRoaXMuYmF0Y2hNaW5UaW1lKTtcblxuICAgICAgICAgICAgaWYgKGJhdGNocyA8IHRoaXMuYmF0Y2hNaW5TaXplICYmIHRoaXMuYXR0ck5vdEluSGVhZGVycygnc3lzdGVtVGFrZXNPdmVyQmF0Y2hzJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEJhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGltZUJldHdlZW5CYXRjaHMgPCB0aGlzLmJhdGNoTWluVGltZSkgdGhyb3cgbmV3IEludmFsaWRUaW1lQmV0d2VlbUJhdGNocygpO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuYmF0Y2hzID0gYmF0Y2hzO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMgPSB0aW1lQmV0d2VlbkJhdGNocztcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluSGVhZGVycygnc3lzdGVtVGFrZXNPdmVyQmF0Y2hzJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbFJlY2lwaWVudHMgPSB0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXRjaHNTaXplID0gXy5mbG9vcih0b3RhbFJlY2lwaWVudHMgLyB0aGlzLnBhcmFtcy5iYXRjaHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJhdGNoc1NpemUgPiB0aGlzLnRvdGFsRW1haWxMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hTaXplTGltaXQodGhpcy50b3RhbEVtYWlsTGltaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKGJhdGNoc1NpemUgKiBiYXRjaHMpICE9PSB0b3RhbFJlY2lwaWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoRGlzdHJpYnV0aW9uSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhdHRyTm90SW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gIV8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSB8fCAhdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuICAgIGF0dHJJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiBfLmhhcyh0aGlzLnBhcmFtcywgYXR0cikgJiYgdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuICAgIGF0dHJOb3RJbkhlYWRlcnMoYXR0cikge1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2hlYWRlcnMnKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiAhXy5oYXModGhpcy5wYXJhbXMuaGVhZGVycywgYXR0cikgfHwgIXRoaXMucGFyYW1zLmhlYWRlcnNbYXR0cl07XG4gICAgfVxuICAgIGF0dHJJbkhlYWRlcnMoYXR0cikge1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2hlYWRlcnMnKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gXy5oYXModGhpcy5wYXJhbXMuaGVhZGVycywgYXR0cikgJiYgdGhpcy5wYXJhbXMuaGVhZGVyc1thdHRyXTtcbiAgICB9XG4gICAgY2hlY2tNYWlsUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdmcm9tJylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd1c2VUcGxEZWZhdWx0RW1haWwnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUmVwbHlFbWFpbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnZnJvbScpKSB0aGlzLnZhbGlkYWRlRnJvbSgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3JlY2lwaWVudExpc3QnKSkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aCkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVCYXRjaHNBcmdzKCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZWNpcGllbnRzKCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVTZW5kQXQoKTtcblxuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N1YmplY3QnKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1N1YmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdE5hbWUnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RlbXBsYXRlU2x1ZycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZU5vRmVhdHVyZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2F0dGFjaG1lbnRzJykpIHRoaXMudmFsaWRhdGVBdHRhY2htZW50cygpO1xuICAgIH1cbiAgICBjaGVja1NlYXJjaFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3RhcnQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdzdGFydCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2VuZCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2VuZCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2FwcElkcycpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2FwcElkcycpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hcHBJZHMpKSB0aHJvdyBuZXcgV3JvbmdUeXBlUGFyYW1YKCdBcnJheScsICdhcHBJZHMnKTtcbiAgICB9XG59XG4iXX0=
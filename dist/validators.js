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
            if (batchs === null && totalRecipients > this.totalEmailLimit) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsImJhdGNoTWluU2l6ZSIsImJhdGNoTWluVGltZSIsInRvdGFsRW1haWxMaW1pdCIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEZvcm1hdEludmFsaWQiLCJpc0VtYWlsSW52YWxpZCIsImJhdGNocyIsImF0dHJJblBhcmFtcyIsInRvdGFsUmVjaXBpZW50cyIsImxlbmd0aCIsImZyb20iLCJoYXMiLCJzZW5kQXQiLCJpc1ZhbGlkIiwiaXNBcnJheSIsImF0dGFjaG1lbnRzIiwidG90YWxBdHRhY2htZW50c1NpemUiLCJhdHRhY2htZW50IiwiaXNPYmplY3QiLCJuYW1lIiwiZmlsZSIsImRmaWxlIiwiZSIsImZpbGVTaXplIiwiZGlmZiIsImF0dHJOb3RJblBhcmFtcyIsImF0dHJOb3RJbkhlYWRlcnMiLCJpc051bWJlciIsInRpbWVCZXR3ZWVuQmF0Y2hzIiwiZmxvb3IiLCJ0ZW1wVGltZSIsImJhdGNoc1NpemUiLCJhdHRyIiwiaGVhZGVycyIsInZhbGlkYWRlRnJvbSIsInZhbGlkYXRlQmF0Y2hzQXJncyIsInZhbGlkYXRlUmVjaXBpZW50cyIsInZhbGlkYXRlU2VuZEF0IiwidmFsaWRhdGVBdHRhY2htZW50cyIsImFwcElkcyIsInRleHQiLCJUUkFDS19FTUFJTF9SRUdFWCIsInRyYWNrZWQiLCJtYXRjaCIsImVtYWlsIiwidHJhY2tFbWFpbCIsIkVNQUlMX1JFR0VYIiwicmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUE2QnFCQSxVO0FBQ2pCLHdCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGFBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLGVBQUwsR0FBdUI7QUFD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N0IsQ0FBTjtBQUN2Qzs7O21DQXZLaUJDLEksRUFBTTtBQUNwQixnQkFBTUMsb0JBQW9CLHNEQUExQjtBQUNBLGdCQUFNQyxVQUFVRixLQUFLRyxLQUFMLENBQVdGLGlCQUFYLENBQWhCO0FBQ0EsbUJBQU9DLFVBQVVBLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBQTlCO0FBQ0g7Ozs2Q0FDMkJGLEksRUFBTTtBQUM5QixnQkFBTUksUUFBUW5ELFdBQVdvRCxVQUFYLENBQXNCTCxJQUF0QixDQUFkO0FBQ0EsbUJBQU9JLFVBQVUsSUFBakI7QUFDSDs7O3VDQUNxQkosSSxFQUFNO0FBQ3hCLGdCQUFNTSxjQUFjLG9EQUFwQjtBQUNBLGdCQUFNRixRQUFRbkQsV0FBV29ELFVBQVgsQ0FBc0JMLElBQXRCLENBQWQ7QUFDQSxnQkFBTU8sU0FBU0gsTUFBTUQsS0FBTixDQUFZRyxXQUFaLENBQWY7QUFDQSxtQkFBT0MsV0FBVyxJQUFsQjtBQUNIOzs7Ozs7a0JBekJnQnRELFUiLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIEludmFsaWRGcm9tLFxuICAgIEludmFsaWRCYXRjaCxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgSW52YWxpZFNlbmRBdCxcbiAgICBCYXRjaFNpemVMaW1pdCxcbiAgICBCYXRjaExvd2VyVGhhbjIsXG4gICAgQmF0Y2hJc1JlcXVpcmVkLFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBJbnZhbGlkRnJvbUZvcm1hdCxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIEF0dGFjaG1lbnRzU2l6ZUxpbWl0LFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0LFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEludmFsaWRUaW1lQmV0d2VlbUJhdGNocyxcbiAgICBCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQsXG4gICAgVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUsXG4gICAgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QsXG4gICAgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCxcbn0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdG9ycyB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLmF0dGFjaFNpemVMaW1pdCA9IHtcbiAgICAgICAgICAgIG1lZ2FieXRlczogMTAsXG4gICAgICAgICAgICBieXRlczogMTAgKiAxMDI0ICogMTAyNCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5iYXRjaE1pblNpemUgPSAyO1xuICAgICAgICB0aGlzLmJhdGNoTWluVGltZSA9IDU7XG4gICAgICAgIHRoaXMudG90YWxFbWFpbExpbWl0ID0gNTAwO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhY2tFbWFpbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFRSQUNLX0VNQUlMX1JFR0VYID0gLyhbYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS5fLV0rXFwuW2EtekEtWjAtOS5fLV0rKS9naTtcbiAgICAgICAgY29uc3QgdHJhY2tlZCA9IHRleHQubWF0Y2goVFJBQ0tfRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gdHJhY2tlZCA/IHRyYWNrZWRbMF0gOiBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNFbWFpbEZvcm1hdEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGVtYWlsID09PSBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNFbWFpbEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBFTUFJTF9SRUdFWCA9IC9eW2EtekEtWjAtOV8uKy1dK0BbYS16QS1aMC05LV0rXFwuW2EtekEtWjAtOS0uXSskL2dpO1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZW1haWwubWF0Y2goRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsO1xuICAgIH1cbiAgICB2YWxpZGF0ZVJlY2lwaWVudHMoKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0LCAocmVjaXBpZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNpcGllbnRMaXN0KHJlY2lwaWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJhdGNocyA9IHRoaXMuYXR0ckluUGFyYW1zKCdiYXRjaHMnKSA/IHRoaXMucGFyYW1zLmJhdGNocyA6IG51bGw7XG4gICAgICAgIGNvbnN0IHRvdGFsUmVjaXBpZW50cyA9IHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoO1xuICAgICAgICBpZiAoYmF0Y2hzID09PSBudWxsICYmIHRvdGFsUmVjaXBpZW50cyA+IHRoaXMudG90YWxFbWFpbExpbWl0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hJc1JlcXVpcmVkKHRvdGFsUmVjaXBpZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhZGVGcm9tKCkge1xuICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZCh0aGlzLnBhcmFtcy5mcm9tKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGcm9tRm9ybWF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlU2VuZEF0KCkge1xuICAgICAgICBpZiAoXy5oYXModGhpcy5wYXJhbXMsICdzZW5kQXQnKSAmJiB0aGlzLnBhcmFtcy5zZW5kQXQpIHtcbiAgICAgICAgICAgIGlmICghbW9tZW50KHRoaXMucGFyYW1zLnNlbmRBdCwgWydZWVlZLU1NLUREIEhIOm1tOnNzJ10sIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU2VuZEF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVBdHRhY2htZW50cygpIHtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMuYXR0YWNobWVudHMpKSB0aHJvdyBuZXcgQXR0YWNobWVudHNTaG91bGRCZUxpc3QoKTtcbiAgICAgICAgbGV0IHRvdGFsQXR0YWNobWVudHNTaXplID0gMDtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzLCAoYXR0YWNobWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGF0dGFjaG1lbnQpKSB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICduYW1lJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5uYW1lXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5uYW1lID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghXy5oYXMoYXR0YWNobWVudCwgJ2ZpbGUnKVxuICAgICAgICAgICAgICAgIHx8ICFhdHRhY2htZW50LmZpbGVcbiAgICAgICAgICAgICAgICB8fCBhdHRhY2htZW50LmZpbGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRmaWxlID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGZpbGUgPSBhdG9iKGF0dGFjaG1lbnQuZmlsZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gZGZpbGUubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGZpbGVTaXplID4gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gZmlsZVNpemUgLSB0aGlzLmF0dGFjaFNpemVMaW1pdC5ieXRlcztcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNpemVMaW1pdChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hTaXplTGltaXQubWVnYWJ5dGVzLCBhdHRhY2htZW50Lm5hbWUsIGRpZmYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxBdHRhY2htZW50c1NpemUgKz0gZmlsZVNpemU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodG90YWxBdHRhY2htZW50c1NpemUgPiB0aGlzLmF0dGFjaFNpemVMaW1pdC5ieXRlcykge1xuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHRvdGFsQXR0YWNobWVudHNTaXplIC0gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXM7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudHNTaXplTGltaXQodGhpcy5hdHRhY2hTaXplTGltaXQubWVnYWJ5dGVzLCBkaWZmKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZUJhdGNoc0FyZ3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnYmF0Y2hzJykgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3RpbWVCZXR3ZWVuQmF0Y2hzJykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnYmF0Y2hzJykgJiYgdGhpcy5hdHRyTm90SW5IZWFkZXJzKCdzeXN0ZW1UYWtlc092ZXJCYXRjaHMnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghXy5pc051bWJlcih0aGlzLnBhcmFtcy5iYXRjaHMpICYmIHRoaXMuYXR0ck5vdEluSGVhZGVycygnc3lzdGVtVGFrZXNPdmVyQmF0Y2hzJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEJhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RpbWVCZXR3ZWVuQmF0Y2hzJykpIHRocm93IG5ldyBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMoKTtcbiAgICAgICAgICAgIGlmICghXy5pc051bWJlcih0aGlzLnBhcmFtcy50aW1lQmV0d2VlbkJhdGNocykpIHRocm93IG5ldyBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy5iYXRjaHMgPCB0aGlzLmJhdGNoTWluU2l6ZVxuICAgICAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluSGVhZGVycygnc3lzdGVtVGFrZXNPdmVyQmF0Y2hzJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hMb3dlclRoYW4yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMgPCB0aGlzLmJhdGNoTWluVGltZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaW1lQmV0d2VlbUJhdGNoc0xlc3NUaGFuNSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYmF0Y2hzID0gXy5mbG9vcih0aGlzLnBhcmFtcy5iYXRjaHMpO1xuICAgICAgICAgICAgY29uc3QgdGVtcFRpbWUgPSBfLmZsb29yKHRoaXMucGFyYW1zLnRpbWVCZXR3ZWVuQmF0Y2hzKTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVCZXR3ZWVuQmF0Y2hzID0gdGhpcy5iYXRjaE1pblRpbWUgKiBfLmZsb29yKHRlbXBUaW1lIC8gdGhpcy5iYXRjaE1pblRpbWUpO1xuXG4gICAgICAgICAgICBpZiAoYmF0Y2hzIDwgdGhpcy5iYXRjaE1pblNpemUgJiYgdGhpcy5hdHRyTm90SW5IZWFkZXJzKCdzeXN0ZW1UYWtlc092ZXJCYXRjaHMnKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aW1lQmV0d2VlbkJhdGNocyA8IHRoaXMuYmF0Y2hNaW5UaW1lKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5iYXRjaHMgPSBiYXRjaHM7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy50aW1lQmV0d2VlbkJhdGNocyA9IHRpbWVCZXR3ZWVuQmF0Y2hzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5IZWFkZXJzKCdzeXN0ZW1UYWtlc092ZXJCYXRjaHMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsUmVjaXBpZW50cyA9IHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhdGNoc1NpemUgPSBfLmZsb29yKHRvdGFsUmVjaXBpZW50cyAvIHRoaXMucGFyYW1zLmJhdGNocyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYmF0Y2hzU2l6ZSA+IHRoaXMudG90YWxFbWFpbExpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaFNpemVMaW1pdCh0aGlzLnRvdGFsRW1haWxMaW1pdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoYmF0Y2hzU2l6ZSAqIGJhdGNocykgIT09IHRvdGFsUmVjaXBpZW50cykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hEaXN0cmlidXRpb25JbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGF0dHJOb3RJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiAhXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpIHx8ICF0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG4gICAgYXR0ckluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSAmJiB0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG4gICAgYXR0ck5vdEluSGVhZGVycyhhdHRyKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnaGVhZGVycycpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICFfLmhhcyh0aGlzLnBhcmFtcy5oZWFkZXJzLCBhdHRyKSB8fCAhdGhpcy5wYXJhbXMuaGVhZGVyc1thdHRyXTtcbiAgICB9XG4gICAgYXR0ckluSGVhZGVycyhhdHRyKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnaGVhZGVycycpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBfLmhhcyh0aGlzLnBhcmFtcy5oZWFkZXJzLCBhdHRyKSAmJiB0aGlzLnBhcmFtcy5oZWFkZXJzW2F0dHJdO1xuICAgIH1cbiAgICBjaGVja01haWxQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2Zyb20nKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9SZXBseUVtYWlsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdmcm9tJykpIHRoaXMudmFsaWRhZGVGcm9tKCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50TGlzdCcpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCkpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIXRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUJhdGNoc0FyZ3MoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudHMoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNlbmRBdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3ViamVjdCcpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndXNlVHBsRGVmYXVsdFN1YmplY3QnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU3ViamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JylcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0TmFtZScpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdEVtYWlsJykpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndGVtcGxhdGVTbHVnJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RlbXBsYXRlTm9GZWF0dXJlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnYXR0YWNobWVudHMnKSkgdGhpcy52YWxpZGF0ZUF0dGFjaG1lbnRzKCk7XG4gICAgfVxuICAgIGNoZWNrU2VhcmNoUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdzdGFydCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ3N0YXJ0Jyk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnZW5kJykpIHRocm93IG5ldyBOb1BhcmFtWCgnZW5kJyk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnYXBwSWRzJykpIHRocm93IG5ldyBOb1BhcmFtWCgnYXBwSWRzJyk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmFwcElkcykpIHRocm93IG5ldyBXcm9uZ1R5cGVQYXJhbVgoJ0FycmF5JywgJ2FwcElkcycpO1xuICAgIH1cbn1cbiJdfQ==
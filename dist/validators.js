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
            if (this.attrNotInParams('batchs') && this.attrNotInParams('timeBetweenBatchs') && this.attrNotInParams('recipientsPerBatchs')) return true;

            if (this.attrNotInParams('timeBetweenBatchs')) throw new _exceptions.InvalidTimeBetweemBatchs();
            if (!_lodash2.default.isNumber(this.params.timeBetweenBatchs)) throw new _exceptions.InvalidTimeBetweemBatchs();
            if (this.params.timeBetweenBatchs < this.batchMinTime) {
                throw new _exceptions.TimeBetweemBatchsLessThan5();
            }
            var tempTime = _lodash2.default.floor(this.params.timeBetweenBatchs);
            var timeBetweenBatchs = this.batchMinTime * _lodash2.default.floor(tempTime / this.batchMinTime);
            if (timeBetweenBatchs < this.batchMinTime) throw new _exceptions.InvalidTimeBetweemBatchs();
            this.params.timeBetweenBatchs = timeBetweenBatchs;

            if (this.attrInHeaders('systemTakesOverBatchs')) return true;

            if (this.attrNotInParams('batchs') && this.attrNotInParams('recipientsPerBatchs')) {
                throw new _exceptions.BatchParamsNotInform();
            }

            var totalRecipients = this.params.recipientList.length;
            if (this.attrInParams('recipientsPerBatchs')) {
                if (!_lodash2.default.isNumber(this.params.recipientsPerBatchs)) {
                    throw new _exceptions.InvalidBatch();
                }
                if (this.params.recipientsPerBatchs < this.batchMinSize) {
                    throw new _exceptions.BatchLowerThan2();
                }
                var recipientsPerBatchs = _lodash2.default.floor(this.params.recipientsPerBatchs);
                if (recipientsPerBatchs < this.batchMinSize) {
                    throw new _exceptions.InvalidBatch();
                }
                this.params.recipientsPerBatchs = recipientsPerBatchs;

                if (recipientsPerBatchs > totalRecipients) {
                    throw new _exceptions.RecipientPerBatchGreater();
                }
            } else if (this.attrInParams('batchs')) {
                if (!_lodash2.default.isNumber(this.params.batchs)) {
                    throw new _exceptions.InvalidBatch();
                }
                if (this.params.batchs < this.batchMinSize) {
                    throw new _exceptions.BatchLowerThan2();
                }
                var batchs = _lodash2.default.floor(this.params.batchs);
                if (batchs < this.batchMinSize) {
                    throw new _exceptions.InvalidBatch();
                }
                this.params.batchs = batchs;
                var batchsSize = _lodash2.default.floor(totalRecipients / this.params.batchs);

                if (batchsSize > this.totalEmailLimit) {
                    throw new _exceptions.BatchSizeLimit(this.totalEmailLimit);
                }
                if (batchsSize * batchs !== totalRecipients) {
                    throw new _exceptions.BatchDistributionInvalid();
                }
            } else {
                throw new _exceptions.BatchParamsNotInform();
            }
            return true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsImJhdGNoTWluU2l6ZSIsImJhdGNoTWluVGltZSIsInRvdGFsRW1haWxMaW1pdCIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEZvcm1hdEludmFsaWQiLCJpc0VtYWlsSW52YWxpZCIsImJhdGNocyIsImF0dHJJblBhcmFtcyIsInRvdGFsUmVjaXBpZW50cyIsImxlbmd0aCIsImF0dHJOb3RJbkhlYWRlcnMiLCJmcm9tIiwiaGFzIiwic2VuZEF0IiwiaXNWYWxpZCIsImlzQXJyYXkiLCJhdHRhY2htZW50cyIsInRvdGFsQXR0YWNobWVudHNTaXplIiwiYXR0YWNobWVudCIsImlzT2JqZWN0IiwibmFtZSIsImZpbGUiLCJkZmlsZSIsImUiLCJmaWxlU2l6ZSIsImRpZmYiLCJhdHRyTm90SW5QYXJhbXMiLCJpc051bWJlciIsInRpbWVCZXR3ZWVuQmF0Y2hzIiwidGVtcFRpbWUiLCJmbG9vciIsImF0dHJJbkhlYWRlcnMiLCJyZWNpcGllbnRzUGVyQmF0Y2hzIiwiYmF0Y2hzU2l6ZSIsImF0dHIiLCJoZWFkZXJzIiwidmFsaWRhZGVGcm9tIiwidmFsaWRhdGVCYXRjaHNBcmdzIiwidmFsaWRhdGVSZWNpcGllbnRzIiwidmFsaWRhdGVTZW5kQXQiLCJ2YWxpZGF0ZUF0dGFjaG1lbnRzIiwiYXBwSWRzIiwidGV4dCIsIlRSQUNLX0VNQUlMX1JFR0VYIiwidHJhY2tlZCIsIm1hdGNoIiwiZW1haWwiLCJ0cmFja0VtYWlsIiwiRU1BSUxfUkVHRVgiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQStCcUJBLFU7QUFDakIsd0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsYUFBS0EsTUFB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c0JMLElBQXRCLENBQWQ7QUFDQSxnQkFBTU8sU0FBU0gsTUFBTUQsS0FBTixDQUFZRyxXQUFaLENBQWY7QUFDQSxtQkFBT0MsV0FBVyxJQUFsQjtBQUNIOzs7Ozs7a0JBNUJnQnhELFUiLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIEludmFsaWRGcm9tLFxuICAgIEludmFsaWRCYXRjaCxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgSW52YWxpZFNlbmRBdCxcbiAgICBCYXRjaFNpemVMaW1pdCxcbiAgICBCYXRjaExvd2VyVGhhbjIsXG4gICAgQmF0Y2hJc1JlcXVpcmVkLFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBJbnZhbGlkRnJvbUZvcm1hdCxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIEJhdGNoUGFyYW1zTm90SW5mb3JtLFxuICAgIEF0dGFjaG1lbnRzU2l6ZUxpbWl0LFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0LFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEludmFsaWRUaW1lQmV0d2VlbUJhdGNocyxcbiAgICBCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQsXG4gICAgUmVjaXBpZW50UGVyQmF0Y2hHcmVhdGVyLFxuICAgIFRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41LFxuICAgIEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0LFxuICAgIEF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQsXG59IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5hdHRhY2hTaXplTGltaXQgPSB7XG4gICAgICAgICAgICBtZWdhYnl0ZXM6IDEwLFxuICAgICAgICAgICAgYnl0ZXM6IDEwICogMTAyNCAqIDEwMjQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYmF0Y2hNaW5TaXplID0gMjtcbiAgICAgICAgdGhpcy5iYXRjaE1pblRpbWUgPSA1O1xuICAgICAgICB0aGlzLnRvdGFsRW1haWxMaW1pdCA9IDUwMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhY2tFbWFpbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFRSQUNLX0VNQUlMX1JFR0VYID0gLyhbYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS5fLV0rXFwuW2EtekEtWjAtOS5fLV0rKS9naTtcbiAgICAgICAgY29uc3QgdHJhY2tlZCA9IHRleHQubWF0Y2goVFJBQ0tfRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gdHJhY2tlZCA/IHRyYWNrZWRbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0VtYWlsRm9ybWF0SW52YWxpZCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gVmFsaWRhdG9ycy50cmFja0VtYWlsKHRleHQpO1xuICAgICAgICByZXR1cm4gZW1haWwgPT09IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRW1haWxJbnZhbGlkKHRleHQpIHtcbiAgICAgICAgY29uc3QgRU1BSUxfUkVHRVggPSAvXlthLXpBLVowLTlfListXStAW2EtekEtWjAtOS1dK1xcLlthLXpBLVowLTktLl0rJC9naTtcbiAgICAgICAgY29uc3QgZW1haWwgPSBWYWxpZGF0b3JzLnRyYWNrRW1haWwodGV4dCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGVtYWlsLm1hdGNoKEVNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVJlY2lwaWVudHMoKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0LCAocmVjaXBpZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNpcGllbnRMaXN0KHJlY2lwaWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJhdGNocyA9IHRoaXMuYXR0ckluUGFyYW1zKCdiYXRjaHMnKSA/IHRoaXMucGFyYW1zLmJhdGNocyA6IG51bGw7XG4gICAgICAgIGNvbnN0IHRvdGFsUmVjaXBpZW50cyA9IHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoO1xuICAgICAgICBpZiAoYmF0Y2hzID09PSBudWxsXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJbkhlYWRlcnMoJ3N5c3RlbVRha2VzT3ZlckJhdGNocycpXG4gICAgICAgICAgICAmJiB0b3RhbFJlY2lwaWVudHMgPiB0aGlzLnRvdGFsRW1haWxMaW1pdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoSXNSZXF1aXJlZCh0b3RhbFJlY2lwaWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhZGVGcm9tKCkge1xuICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZCh0aGlzLnBhcmFtcy5mcm9tKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGcm9tRm9ybWF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVTZW5kQXQoKSB7XG4gICAgICAgIGlmIChfLmhhcyh0aGlzLnBhcmFtcywgJ3NlbmRBdCcpICYmIHRoaXMucGFyYW1zLnNlbmRBdCkge1xuICAgICAgICAgICAgaWYgKCFtb21lbnQodGhpcy5wYXJhbXMuc2VuZEF0LCBbJ1lZWVktTU0tREQgSEg6bW06c3MnXSwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTZW5kQXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlQXR0YWNobWVudHMoKSB7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzKSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0KCk7XG4gICAgICAgIGxldCB0b3RhbEF0dGFjaG1lbnRzU2l6ZSA9IDA7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5hdHRhY2htZW50cywgKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhdHRhY2htZW50KSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnbmFtZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICdmaWxlJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5maWxlXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5maWxlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRmaWxlID0gYXRvYihhdHRhY2htZW50LmZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IGRmaWxlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmaWxlU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGZpbGVTaXplIC0gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXM7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaXplTGltaXQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgYXR0YWNobWVudC5uYW1lLCBkaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsQXR0YWNobWVudHNTaXplICs9IGZpbGVTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRvdGFsQXR0YWNobWVudHNTaXplID4gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB0b3RhbEF0dGFjaG1lbnRzU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2l6ZUxpbWl0KHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgZGlmZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUJhdGNoc0FyZ3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnYmF0Y2hzJykgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RpbWVCZXR3ZWVuQmF0Y2hzJylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCdyZWNpcGllbnRzUGVyQmF0Y2hzJykpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygndGltZUJldHdlZW5CYXRjaHMnKSkgdGhyb3cgbmV3IEludmFsaWRUaW1lQmV0d2VlbUJhdGNocygpO1xuICAgICAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMpKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy50aW1lQmV0d2VlbkJhdGNocyA8IHRoaXMuYmF0Y2hNaW5UaW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZW1wVGltZSA9IF8uZmxvb3IodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMpO1xuICAgICAgICBjb25zdCB0aW1lQmV0d2VlbkJhdGNocyA9IHRoaXMuYmF0Y2hNaW5UaW1lICogXy5mbG9vcih0ZW1wVGltZSAvIHRoaXMuYmF0Y2hNaW5UaW1lKTtcbiAgICAgICAgaWYgKHRpbWVCZXR3ZWVuQmF0Y2hzIDwgdGhpcy5iYXRjaE1pblRpbWUpIHRocm93IG5ldyBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMoKTtcbiAgICAgICAgdGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMgPSB0aW1lQmV0d2VlbkJhdGNocztcblxuICAgICAgICBpZiAodGhpcy5hdHRySW5IZWFkZXJzKCdzeXN0ZW1UYWtlc092ZXJCYXRjaHMnKSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdiYXRjaHMnKSAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50c1BlckJhdGNocycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hQYXJhbXNOb3RJbmZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRvdGFsUmVjaXBpZW50cyA9IHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ3JlY2lwaWVudHNQZXJCYXRjaHMnKSkge1xuICAgICAgICAgICAgaWYgKCFfLmlzTnVtYmVyKHRoaXMucGFyYW1zLnJlY2lwaWVudHNQZXJCYXRjaHMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRCYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLnJlY2lwaWVudHNQZXJCYXRjaHMgPCB0aGlzLmJhdGNoTWluU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaExvd2VyVGhhbjIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlY2lwaWVudHNQZXJCYXRjaHMgPSBfLmZsb29yKHRoaXMucGFyYW1zLnJlY2lwaWVudHNQZXJCYXRjaHMpO1xuICAgICAgICAgICAgaWYgKHJlY2lwaWVudHNQZXJCYXRjaHMgPCB0aGlzLmJhdGNoTWluU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnJlY2lwaWVudHNQZXJCYXRjaHMgPSByZWNpcGllbnRzUGVyQmF0Y2hzO1xuXG4gICAgICAgICAgICBpZiAocmVjaXBpZW50c1BlckJhdGNocyA+IHRvdGFsUmVjaXBpZW50cykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZWNpcGllbnRQZXJCYXRjaEdyZWF0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF0dHJJblBhcmFtcygnYmF0Y2hzJykpIHtcbiAgICAgICAgICAgIGlmICghXy5pc051bWJlcih0aGlzLnBhcmFtcy5iYXRjaHMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRCYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmJhdGNocyA8IHRoaXMuYmF0Y2hNaW5TaXplKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoTG93ZXJUaGFuMigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYmF0Y2hzID0gXy5mbG9vcih0aGlzLnBhcmFtcy5iYXRjaHMpO1xuICAgICAgICAgICAgaWYgKGJhdGNocyA8IHRoaXMuYmF0Y2hNaW5TaXplKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRCYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuYmF0Y2hzID0gYmF0Y2hzO1xuICAgICAgICAgICAgY29uc3QgYmF0Y2hzU2l6ZSA9IF8uZmxvb3IodG90YWxSZWNpcGllbnRzIC8gdGhpcy5wYXJhbXMuYmF0Y2hzKTtcblxuICAgICAgICAgICAgaWYgKGJhdGNoc1NpemUgPiB0aGlzLnRvdGFsRW1haWxMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaFNpemVMaW1pdCh0aGlzLnRvdGFsRW1haWxMaW1pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGJhdGNoc1NpemUgKiBiYXRjaHMpICE9PSB0b3RhbFJlY2lwaWVudHMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hEaXN0cmlidXRpb25JbnZhbGlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hQYXJhbXNOb3RJbmZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhdHRyTm90SW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gIV8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSB8fCAhdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuXG4gICAgYXR0ckluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSAmJiB0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG5cbiAgICBhdHRyTm90SW5IZWFkZXJzKGF0dHIpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdoZWFkZXJzJykpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gIV8uaGFzKHRoaXMucGFyYW1zLmhlYWRlcnMsIGF0dHIpIHx8ICF0aGlzLnBhcmFtcy5oZWFkZXJzW2F0dHJdO1xuICAgIH1cblxuICAgIGF0dHJJbkhlYWRlcnMoYXR0cikge1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2hlYWRlcnMnKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gXy5oYXModGhpcy5wYXJhbXMuaGVhZGVycywgYXR0cikgJiYgdGhpcy5wYXJhbXMuaGVhZGVyc1thdHRyXTtcbiAgICB9XG5cbiAgICBjaGVja01haWxQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2Zyb20nKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9SZXBseUVtYWlsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdmcm9tJykpIHRoaXMudmFsaWRhZGVGcm9tKCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50TGlzdCcpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCkpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIXRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUJhdGNoc0FyZ3MoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudHMoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNlbmRBdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3ViamVjdCcpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndXNlVHBsRGVmYXVsdFN1YmplY3QnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU3ViamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JylcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0TmFtZScpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdEVtYWlsJykpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndGVtcGxhdGVTbHVnJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RlbXBsYXRlTm9GZWF0dXJlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnYXR0YWNobWVudHMnKSkgdGhpcy52YWxpZGF0ZUF0dGFjaG1lbnRzKCk7XG4gICAgfVxuXG4gICAgY2hlY2tTZWFyY2hQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N0YXJ0JykpIHRocm93IG5ldyBOb1BhcmFtWCgnc3RhcnQnKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdlbmQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdlbmQnKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdhcHBJZHMnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdhcHBJZHMnKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMuYXBwSWRzKSkgdGhyb3cgbmV3IFdyb25nVHlwZVBhcmFtWCgnQXJyYXknLCAnYXBwSWRzJyk7XG4gICAgfVxufVxuIl19
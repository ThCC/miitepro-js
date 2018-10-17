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

                var remaining = totalRecipients % batchs;
                var lastBatchPlusOne = this.attrInHeaders('lastBatchPlusOne');

                if (remaining && lastBatchPlusOne) return true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsImJhdGNoTWluU2l6ZSIsImJhdGNoTWluVGltZSIsInRvdGFsRW1haWxMaW1pdCIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEZvcm1hdEludmFsaWQiLCJpc0VtYWlsSW52YWxpZCIsImJhdGNocyIsImF0dHJJblBhcmFtcyIsInRvdGFsUmVjaXBpZW50cyIsImxlbmd0aCIsImF0dHJOb3RJbkhlYWRlcnMiLCJmcm9tIiwiaGFzIiwic2VuZEF0IiwiaXNWYWxpZCIsImlzQXJyYXkiLCJhdHRhY2htZW50cyIsInRvdGFsQXR0YWNobWVudHNTaXplIiwiYXR0YWNobWVudCIsImlzT2JqZWN0IiwibmFtZSIsImZpbGUiLCJkZmlsZSIsImUiLCJmaWxlU2l6ZSIsImRpZmYiLCJhdHRyTm90SW5QYXJhbXMiLCJpc051bWJlciIsInRpbWVCZXR3ZWVuQmF0Y2hzIiwidGVtcFRpbWUiLCJmbG9vciIsImF0dHJJbkhlYWRlcnMiLCJyZWNpcGllbnRzUGVyQmF0Y2hzIiwiYmF0Y2hzU2l6ZSIsInJlbWFpbmluZyIsImxhc3RCYXRjaFBsdXNPbmUiLCJhdHRyIiwiaGVhZGVycyIsInZhbGlkYWRlRnJvbSIsInZhbGlkYXRlQmF0Y2hzQXJncyIsInZhbGlkYXRlUmVjaXBpZW50cyIsInZhbGlkYXRlU2VuZEF0IiwidmFsaWRhdGVBdHRhY2htZW50cyIsImFwcElkcyIsInRleHQiLCJUUkFDS19FTUFJTF9SRUdFWCIsInRyYWNrZWQiLCJtYXRjaCIsImVtYWlsIiwidHJhY2tFbWFpbCIsIkVNQUlMX1JFR0VYIiwicmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUErQnFCQSxVO0FBQ2pCLHdCQUFZQyxN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LEVBQU07QUFDOUIsZ0JBQU1JLFFBQVF2RCxXQUFXd0QsVUFBWCxDQUFzQkwsSUFBdEIsQ0FBZDtBQUNBLG1CQUFPSSxVQUFVLElBQWpCO0FBQ0g7Ozt1Q0FFcUJKLEksRUFBTTtBQUN4QixnQkFBTU0sY0FBYyxvREFBcEI7QUFDQSxnQkFBTUYsUUFBUXZELFdBQVd3RCxVQUFYLENBQXNCTCxJQUF0QixDQUFkO0FBQ0EsZ0JBQU1PLFNBQVNILE1BQU1ELEtBQU4sQ0FBWUcsV0FBWixDQUFmO0FBQ0EsbUJBQU9DLFdBQVcsSUFBbEI7QUFDSDs7Ozs7O2tCQTVCZ0IxRCxVIiwiZmlsZSI6InZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGF0b2IgZnJvbSAnYXRvYic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1xuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb1JlY2lwaWVudCxcbiAgICBJbnZhbGlkRnJvbSxcbiAgICBJbnZhbGlkQmF0Y2gsXG4gICAgTm9SZXBseUVtYWlsLFxuICAgIEludmFsaWRTZW5kQXQsXG4gICAgQmF0Y2hTaXplTGltaXQsXG4gICAgQmF0Y2hMb3dlclRoYW4yLFxuICAgIEJhdGNoSXNSZXF1aXJlZCxcbiAgICBXcm9uZ1R5cGVQYXJhbVgsXG4gICAgSW52YWxpZEZyb21Gb3JtYXQsXG4gICAgQXR0YWNobWVudFNpemVMaW1pdCxcbiAgICBCYXRjaFBhcmFtc05vdEluZm9ybSxcbiAgICBBdHRhY2htZW50c1NpemVMaW1pdCxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbiAgICBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCxcbiAgICBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lLFxuICAgIEF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSxcbiAgICBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMsXG4gICAgQmF0Y2hEaXN0cmlidXRpb25JbnZhbGlkLFxuICAgIFJlY2lwaWVudFBlckJhdGNoR3JlYXRlcixcbiAgICBUaW1lQmV0d2VlbUJhdGNoc0xlc3NUaGFuNSxcbiAgICBJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCxcbiAgICBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0LFxufSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0b3JzIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0ID0ge1xuICAgICAgICAgICAgbWVnYWJ5dGVzOiAxMCxcbiAgICAgICAgICAgIGJ5dGVzOiAxMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJhdGNoTWluU2l6ZSA9IDI7XG4gICAgICAgIHRoaXMuYmF0Y2hNaW5UaW1lID0gNTtcbiAgICAgICAgdGhpcy50b3RhbEVtYWlsTGltaXQgPSA1MDA7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYWNrRW1haWwodGV4dCkge1xuICAgICAgICBjb25zdCBUUkFDS19FTUFJTF9SRUdFWCA9IC8oW2EtekEtWjAtOS5fLV0rQFthLXpBLVowLTkuXy1dK1xcLlthLXpBLVowLTkuXy1dKykvZ2k7XG4gICAgICAgIGNvbnN0IHRyYWNrZWQgPSB0ZXh0Lm1hdGNoKFRSQUNLX0VNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHRyYWNrZWQgPyB0cmFja2VkWzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNFbWFpbEZvcm1hdEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGVtYWlsID09PSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0VtYWlsSW52YWxpZCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IEVNQUlMX1JFR0VYID0gL15bYS16QS1aMC05Xy4rLV0rQFthLXpBLVowLTktXStcXC5bYS16QS1aMC05LS5dKyQvZ2k7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gVmFsaWRhdG9ycy50cmFja0VtYWlsKHRleHQpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBlbWFpbC5tYXRjaChFTUFJTF9SRUdFWCk7XG4gICAgICAgIHJldHVybiByZXN1bHQgPT09IG51bGw7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVSZWNpcGllbnRzKCkge1xuICAgICAgICBfLmZvckVhY2godGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCwgKHJlY2lwaWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEZvcm1hdEludmFsaWQocmVjaXBpZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQocmVjaXBpZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVjaXBpZW50TGlzdChyZWNpcGllbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBiYXRjaHMgPSB0aGlzLmF0dHJJblBhcmFtcygnYmF0Y2hzJykgPyB0aGlzLnBhcmFtcy5iYXRjaHMgOiBudWxsO1xuICAgICAgICBjb25zdCB0b3RhbFJlY2lwaWVudHMgPSB0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aDtcbiAgICAgICAgaWYgKGJhdGNocyA9PT0gbnVsbFxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5IZWFkZXJzKCdzeXN0ZW1UYWtlc092ZXJCYXRjaHMnKVxuICAgICAgICAgICAgJiYgdG90YWxSZWNpcGllbnRzID4gdGhpcy50b3RhbEVtYWlsTGltaXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaElzUmVxdWlyZWQodG90YWxSZWNpcGllbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYWRlRnJvbSgpIHtcbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEZvcm1hdEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbUZvcm1hdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHRoaXMucGFyYW1zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZyb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlU2VuZEF0KCkge1xuICAgICAgICBpZiAoXy5oYXModGhpcy5wYXJhbXMsICdzZW5kQXQnKSAmJiB0aGlzLnBhcmFtcy5zZW5kQXQpIHtcbiAgICAgICAgICAgIGlmICghbW9tZW50KHRoaXMucGFyYW1zLnNlbmRBdCwgWydZWVlZLU1NLUREIEhIOm1tOnNzJ10sIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU2VuZEF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUF0dGFjaG1lbnRzKCkge1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hdHRhY2htZW50cykpIHRocm93IG5ldyBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCgpO1xuICAgICAgICBsZXQgdG90YWxBdHRhY2htZW50c1NpemUgPSAwO1xuICAgICAgICBfLmZvckVhY2godGhpcy5wYXJhbXMuYXR0YWNobWVudHMsIChhdHRhY2htZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIV8uaXNPYmplY3QoYXR0YWNobWVudCkpIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgICAgIGlmICghXy5oYXMoYXR0YWNobWVudCwgJ25hbWUnKVxuICAgICAgICAgICAgICAgIHx8ICFhdHRhY2htZW50Lm5hbWVcbiAgICAgICAgICAgICAgICB8fCBhdHRhY2htZW50Lm5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRIYXZlTmFtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnZmlsZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQuZmlsZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQuZmlsZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGZpbGUgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkZmlsZSA9IGF0b2IoYXR0YWNobWVudC5maWxlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBkZmlsZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZmlsZVNpemUgPiB0aGlzLmF0dGFjaFNpemVMaW1pdC5ieXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBmaWxlU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2l6ZUxpbWl0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFNpemVMaW1pdC5tZWdhYnl0ZXMsIGF0dGFjaG1lbnQubmFtZSwgZGlmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEF0dGFjaG1lbnRzU2l6ZSArPSBmaWxlU2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0b3RhbEF0dGFjaG1lbnRzU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gdG90YWxBdHRhY2htZW50c1NpemUgLSB0aGlzLmF0dGFjaFNpemVMaW1pdC5ieXRlcztcbiAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50c1NpemVMaW1pdCh0aGlzLmF0dGFjaFNpemVMaW1pdC5tZWdhYnl0ZXMsIGRpZmYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVCYXRjaHNBcmdzKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2JhdGNocycpICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd0aW1lQmV0d2VlbkJhdGNocycpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50c1BlckJhdGNocycpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RpbWVCZXR3ZWVuQmF0Y2hzJykpIHRocm93IG5ldyBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMoKTtcbiAgICAgICAgaWYgKCFfLmlzTnVtYmVyKHRoaXMucGFyYW1zLnRpbWVCZXR3ZWVuQmF0Y2hzKSkgdGhyb3cgbmV3IEludmFsaWRUaW1lQmV0d2VlbUJhdGNocygpO1xuICAgICAgICBpZiAodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMgPCB0aGlzLmJhdGNoTWluVGltZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVtcFRpbWUgPSBfLmZsb29yKHRoaXMucGFyYW1zLnRpbWVCZXR3ZWVuQmF0Y2hzKTtcbiAgICAgICAgY29uc3QgdGltZUJldHdlZW5CYXRjaHMgPSB0aGlzLmJhdGNoTWluVGltZSAqIF8uZmxvb3IodGVtcFRpbWUgLyB0aGlzLmJhdGNoTWluVGltZSk7XG4gICAgICAgIGlmICh0aW1lQmV0d2VlbkJhdGNocyA8IHRoaXMuYmF0Y2hNaW5UaW1lKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgIHRoaXMucGFyYW1zLnRpbWVCZXR3ZWVuQmF0Y2hzID0gdGltZUJldHdlZW5CYXRjaHM7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluSGVhZGVycygnc3lzdGVtVGFrZXNPdmVyQmF0Y2hzJykpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnYmF0Y2hzJykgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3JlY2lwaWVudHNQZXJCYXRjaHMnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoUGFyYW1zTm90SW5mb3JtKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0b3RhbFJlY2lwaWVudHMgPSB0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdyZWNpcGllbnRzUGVyQmF0Y2hzJykpIHtcbiAgICAgICAgICAgIGlmICghXy5pc051bWJlcih0aGlzLnBhcmFtcy5yZWNpcGllbnRzUGVyQmF0Y2hzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy5yZWNpcGllbnRzUGVyQmF0Y2hzIDwgdGhpcy5iYXRjaE1pblNpemUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hMb3dlclRoYW4yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWNpcGllbnRzUGVyQmF0Y2hzID0gXy5mbG9vcih0aGlzLnBhcmFtcy5yZWNpcGllbnRzUGVyQmF0Y2hzKTtcbiAgICAgICAgICAgIGlmIChyZWNpcGllbnRzUGVyQmF0Y2hzIDwgdGhpcy5iYXRjaE1pblNpemUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEJhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5yZWNpcGllbnRzUGVyQmF0Y2hzID0gcmVjaXBpZW50c1BlckJhdGNocztcblxuICAgICAgICAgICAgaWYgKHJlY2lwaWVudHNQZXJCYXRjaHMgPiB0b3RhbFJlY2lwaWVudHMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVjaXBpZW50UGVyQmF0Y2hHcmVhdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2JhdGNocycpKSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wYXJhbXMuYmF0Y2hzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy5iYXRjaHMgPCB0aGlzLmJhdGNoTWluU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaExvd2VyVGhhbjIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJhdGNocyA9IF8uZmxvb3IodGhpcy5wYXJhbXMuYmF0Y2hzKTtcbiAgICAgICAgICAgIGlmIChiYXRjaHMgPCB0aGlzLmJhdGNoTWluU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkQmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmJhdGNocyA9IGJhdGNocztcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoc1NpemUgPSBfLmZsb29yKHRvdGFsUmVjaXBpZW50cyAvIHRoaXMucGFyYW1zLmJhdGNocyk7XG5cbiAgICAgICAgICAgIGlmIChiYXRjaHNTaXplID4gdGhpcy50b3RhbEVtYWlsTGltaXQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hTaXplTGltaXQodGhpcy50b3RhbEVtYWlsTGltaXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZW1haW5pbmcgPSB0b3RhbFJlY2lwaWVudHMgJSBiYXRjaHM7XG4gICAgICAgICAgICBjb25zdCBsYXN0QmF0Y2hQbHVzT25lID0gdGhpcy5hdHRySW5IZWFkZXJzKCdsYXN0QmF0Y2hQbHVzT25lJyk7XG5cbiAgICAgICAgICAgIGlmIChyZW1haW5pbmcgJiYgbGFzdEJhdGNoUGx1c09uZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIGlmICgoYmF0Y2hzU2l6ZSAqIGJhdGNocykgIT09IHRvdGFsUmVjaXBpZW50cykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaFBhcmFtc05vdEluZm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGF0dHJOb3RJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiAhXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpIHx8ICF0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG5cbiAgICBhdHRySW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpICYmIHRoaXMucGFyYW1zW2F0dHJdO1xuICAgIH1cblxuICAgIGF0dHJOb3RJbkhlYWRlcnMoYXR0cikge1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2hlYWRlcnMnKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiAhXy5oYXModGhpcy5wYXJhbXMuaGVhZGVycywgYXR0cikgfHwgIXRoaXMucGFyYW1zLmhlYWRlcnNbYXR0cl07XG4gICAgfVxuXG4gICAgYXR0ckluSGVhZGVycyhhdHRyKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnaGVhZGVycycpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBfLmhhcyh0aGlzLnBhcmFtcy5oZWFkZXJzLCBhdHRyKSAmJiB0aGlzLnBhcmFtcy5oZWFkZXJzW2F0dHJdO1xuICAgIH1cblxuICAgIGNoZWNrTWFpbFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnZnJvbScpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndXNlVHBsRGVmYXVsdEVtYWlsJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1JlcGx5RW1haWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2Zyb20nKSkgdGhpcy52YWxpZGFkZUZyb20oKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdyZWNpcGllbnRMaXN0JykpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0KSkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIGlmICghdGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdC5sZW5ndGgpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlQmF0Y2hzQXJncygpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlUmVjaXBpZW50cygpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2VuZEF0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdzdWJqZWN0JylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9TdWJqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdFN1YmplY3QnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHROYW1lJylcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0RW1haWwnKSlcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd0ZW1wbGF0ZVNsdWcnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGVOb0ZlYXR1cmVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdhdHRhY2htZW50cycpKSB0aGlzLnZhbGlkYXRlQXR0YWNobWVudHMoKTtcbiAgICB9XG5cbiAgICBjaGVja1NlYXJjaFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3RhcnQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdzdGFydCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2VuZCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2VuZCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2FwcElkcycpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2FwcElkcycpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hcHBJZHMpKSB0aHJvdyBuZXcgV3JvbmdUeXBlUGFyYW1YKCdBcnJheScsICdhcHBJZHMnKTtcbiAgICB9XG59XG4iXX0=
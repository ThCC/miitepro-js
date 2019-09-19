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
                    throw new _exceptions.InvalidSendAtFormat();
                }
                if ((0, _moment2.default)(this.params.sendAt).isBefore((0, _moment2.default)())) {
                    throw new _exceptions.SendAtLowerThanToday();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsInRvdGFsRW1haWxMaW1pdCIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEZvcm1hdEludmFsaWQiLCJpc0VtYWlsSW52YWxpZCIsImZyb20iLCJoYXMiLCJzZW5kQXQiLCJpc1ZhbGlkIiwiaXNCZWZvcmUiLCJpc0FycmF5IiwiYXR0YWNobWVudHMiLCJ0b3RhbEF0dGFjaG1lbnRzU2l6ZSIsImF0dGFjaG1lbnQiLCJpc09iamVjdCIsIm5hbWUiLCJmaWxlIiwiZGZpbGUiLCJlIiwiZmlsZVNpemUiLCJsZW5ndGgiLCJkaWZmIiwiYXR0ciIsImF0dHJOb3RJblBhcmFtcyIsImhlYWRlcnMiLCJhdHRySW5QYXJhbXMiLCJ2YWxpZGFkZUZyb20iLCJ2YWxpZGF0ZVJlY2lwaWVudHMiLCJ2YWxpZGF0ZVNlbmRBdCIsInZhbGlkYXRlQXR0YWNobWVudHMiLCJhcHBJZHMiLCJ0ZXh0IiwiVFJBQ0tfRU1BSUxfUkVHRVgiLCJ0cmFja2VkIiwibWF0Y2giLCJlbWFpbCIsInRyYWNrRW1haWwiLCJFTUFJTF9SRUdFWCIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBdUJxQkEsVTtBQUNqQix3QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNoQixhQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxlQUFMLEdBQXVCO0FBQ25CQyx1QkFBVyxFQURRO0FBRW5CQyxtQkFBTyxLQUFLLElBQUwsR0FBWTtBQUZBLFNBQXZCO0FBSUEsYUFBS0MsZUFBTCxHQUF1QixHQUF2QjtBQUNIOzs7OzZDQW9Cb0I7QUFDakIsNkJBQUVDLE9BQUYsQ0FBVSxLQUFLTCxNQUFMLENBQVlNLGFBQXRCLEVBQXFD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QUFDdkM7OzttQ0F0SWlCQyxJLEVBQU07QUFDcEIsZ0JBQU1DLG9CQUFvQixzREFBMUI7QUFDQSxnQkFBTUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXRixpQkFBWCxDQUFoQjtBQUNBLG1CQUFPQyxVQUFVQSxRQUFRLENBQVIsQ0FBVixHQUF1QixJQUE5QjtBQUNIOzs7NkNBRTJCRixJLEVBQU07QUFDOUIsZ0JBQU1JLFFBQVF6QyxXQUFXMEMsVUFBWCxDQUFzQkwsSUFBdEIsQ0FBZDtBQUNBLG1CQUFPSSxVQUFVLElBQWpCO0FBQ0g7Ozt1Q0FFcUJKLEksRUFBTTtBQUN4QixnQkFBTU0sY0FBYyxvREFBcEI7QUFDQSxnQkFBTUYsUUFBUXpDLFdBQVcwQyxVQUFYLENBQXNCTCxJQUF0QixDQUFkO0FBQ0EsZ0JBQU1PLFNBQVNILE1BQU1ELEtBQU4sQ0FBWUcsV0FBWixDQUFmO0FBQ0EsbUJBQU9DLFdBQVcsSUFBbEI7QUFDSDs7Ozs7O2tCQTFCZ0I1QyxVIiwiZmlsZSI6InZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGF0b2IgZnJvbSAnYXRvYic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1xuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb1JlY2lwaWVudCxcbiAgICBJbnZhbGlkRnJvbSxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgV3JvbmdUeXBlUGFyYW1YLFxuICAgIEludmFsaWRGcm9tRm9ybWF0LFxuICAgIEludmFsaWRTZW5kQXRGb3JtYXQsXG4gICAgQXR0YWNobWVudFNpemVMaW1pdCxcbiAgICBTZW5kQXRMb3dlclRoYW5Ub2RheSxcbiAgICBBdHRhY2htZW50c1NpemVMaW1pdCxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbiAgICBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCxcbiAgICBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lLFxuICAgIEF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSxcbiAgICBJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCxcbiAgICBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0LFxufSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0b3JzIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0ID0ge1xuICAgICAgICAgICAgbWVnYWJ5dGVzOiAxMCxcbiAgICAgICAgICAgIGJ5dGVzOiAxMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvdGFsRW1haWxMaW1pdCA9IDUwMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhY2tFbWFpbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFRSQUNLX0VNQUlMX1JFR0VYID0gLyhbYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS5fLV0rXFwuW2EtekEtWjAtOS5fLV0rKS9naTtcbiAgICAgICAgY29uc3QgdHJhY2tlZCA9IHRleHQubWF0Y2goVFJBQ0tfRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gdHJhY2tlZCA/IHRyYWNrZWRbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0VtYWlsRm9ybWF0SW52YWxpZCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gVmFsaWRhdG9ycy50cmFja0VtYWlsKHRleHQpO1xuICAgICAgICByZXR1cm4gZW1haWwgPT09IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRW1haWxJbnZhbGlkKHRleHQpIHtcbiAgICAgICAgY29uc3QgRU1BSUxfUkVHRVggPSAvXlthLXpBLVowLTlfListXStAW2EtekEtWjAtOS1dK1xcLlthLXpBLVowLTktLl0rJC9naTtcbiAgICAgICAgY29uc3QgZW1haWwgPSBWYWxpZGF0b3JzLnRyYWNrRW1haWwodGV4dCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGVtYWlsLm1hdGNoKEVNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVJlY2lwaWVudHMoKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0LCAocmVjaXBpZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNpcGllbnRMaXN0KHJlY2lwaWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkYWRlRnJvbSgpIHtcbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEZvcm1hdEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbUZvcm1hdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHRoaXMucGFyYW1zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZyb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlU2VuZEF0KCkge1xuICAgICAgICBpZiAoXy5oYXModGhpcy5wYXJhbXMsICdzZW5kQXQnKSAmJiB0aGlzLnBhcmFtcy5zZW5kQXQpIHtcbiAgICAgICAgICAgIGlmICghbW9tZW50KHRoaXMucGFyYW1zLnNlbmRBdCwgWydZWVlZLU1NLUREIEhIOm1tOnNzJ10sIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU2VuZEF0Rm9ybWF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9tZW50KHRoaXMucGFyYW1zLnNlbmRBdCkuaXNCZWZvcmUobW9tZW50KCkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFNlbmRBdExvd2VyVGhhblRvZGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUF0dGFjaG1lbnRzKCkge1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hdHRhY2htZW50cykpIHRocm93IG5ldyBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCgpO1xuICAgICAgICBsZXQgdG90YWxBdHRhY2htZW50c1NpemUgPSAwO1xuICAgICAgICBfLmZvckVhY2godGhpcy5wYXJhbXMuYXR0YWNobWVudHMsIChhdHRhY2htZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIV8uaXNPYmplY3QoYXR0YWNobWVudCkpIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgICAgIGlmICghXy5oYXMoYXR0YWNobWVudCwgJ25hbWUnKVxuICAgICAgICAgICAgICAgIHx8ICFhdHRhY2htZW50Lm5hbWVcbiAgICAgICAgICAgICAgICB8fCBhdHRhY2htZW50Lm5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRIYXZlTmFtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnZmlsZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQuZmlsZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQuZmlsZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGZpbGUgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkZmlsZSA9IGF0b2IoYXR0YWNobWVudC5maWxlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBkZmlsZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZmlsZVNpemUgPiB0aGlzLmF0dGFjaFNpemVMaW1pdC5ieXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBmaWxlU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2l6ZUxpbWl0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaFNpemVMaW1pdC5tZWdhYnl0ZXMsIGF0dGFjaG1lbnQubmFtZSwgZGlmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbEF0dGFjaG1lbnRzU2l6ZSArPSBmaWxlU2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0b3RhbEF0dGFjaG1lbnRzU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gdG90YWxBdHRhY2htZW50c1NpemUgLSB0aGlzLmF0dGFjaFNpemVMaW1pdC5ieXRlcztcbiAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50c1NpemVMaW1pdCh0aGlzLmF0dGFjaFNpemVMaW1pdC5tZWdhYnl0ZXMsIGRpZmYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0ck5vdEluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuICFfLmhhcyh0aGlzLnBhcmFtcywgYXR0cikgfHwgIXRoaXMucGFyYW1zW2F0dHJdO1xuICAgIH1cblxuICAgIGF0dHJJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiBfLmhhcyh0aGlzLnBhcmFtcywgYXR0cikgJiYgdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuXG4gICAgYXR0ck5vdEluSGVhZGVycyhhdHRyKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnaGVhZGVycycpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICFfLmhhcyh0aGlzLnBhcmFtcy5oZWFkZXJzLCBhdHRyKSB8fCAhdGhpcy5wYXJhbXMuaGVhZGVyc1thdHRyXTtcbiAgICB9XG5cbiAgICBhdHRySW5IZWFkZXJzKGF0dHIpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdoZWFkZXJzJykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMucGFyYW1zLmhlYWRlcnMsIGF0dHIpICYmIHRoaXMucGFyYW1zLmhlYWRlcnNbYXR0cl07XG4gICAgfVxuXG4gICAgY2hlY2tNYWlsUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdmcm9tJylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd1c2VUcGxEZWZhdWx0RW1haWwnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUmVwbHlFbWFpbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnZnJvbScpKSB0aGlzLnZhbGlkYWRlRnJvbSgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3JlY2lwaWVudExpc3QnKSkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aCkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZWNpcGllbnRzKCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVTZW5kQXQoKTtcblxuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N1YmplY3QnKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1N1YmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdE5hbWUnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RlbXBsYXRlU2x1ZycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZU5vRmVhdHVyZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2F0dGFjaG1lbnRzJykpIHRoaXMudmFsaWRhdGVBdHRhY2htZW50cygpO1xuICAgIH1cblxuICAgIGNoZWNrU2VhcmNoUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdzdGFydCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ3N0YXJ0Jyk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnZW5kJykpIHRocm93IG5ldyBOb1BhcmFtWCgnZW5kJyk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnYXBwSWRzJykpIHRocm93IG5ldyBOb1BhcmFtWCgnYXBwSWRzJyk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmFwcElkcykpIHRocm93IG5ldyBXcm9uZ1R5cGVQYXJhbVgoJ0FycmF5JywgJ2FwcElkcycpO1xuICAgIH1cbn1cbiJdfQ==
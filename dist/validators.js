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
    }

    _createClass(Validators, [{
        key: 'validateRecipients',
        value: function validateRecipients() {
            _lodash2.default.forEach(this.params.recipientList, function (recipient) {
                if (Validators.isEmailInvalid(recipient)) {
                    throw new _exceptions.InvalidRecipientList();
                }
            });
        }
    }, {
        key: 'validadeFrom',
        value: function validadeFrom() {
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
        key: 'isEmailInvalid',
        value: function isEmailInvalid(text) {
            var EMAIL_REGEX = /(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/gi;
            var email = Validators.trackEmail(text);
            if (!email) return true;
            var result = email.match(EMAIL_REGEX);
            return result === null;
        }
    }]);

    return Validators;
}();

exports.default = Validators;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEludmFsaWQiLCJmcm9tIiwiaGFzIiwic2VuZEF0IiwiaXNWYWxpZCIsImlzQXJyYXkiLCJhdHRhY2htZW50cyIsInRvdGFsQXR0YWNobWVudHNTaXplIiwiYXR0YWNobWVudCIsImlzT2JqZWN0IiwibmFtZSIsImZpbGUiLCJkZmlsZSIsImUiLCJmaWxlU2l6ZSIsImxlbmd0aCIsImRpZmYiLCJhdHRyIiwiYXR0ck5vdEluUGFyYW1zIiwiYXR0ckluUGFyYW1zIiwidmFsaWRhZGVGcm9tIiwidmFsaWRhdGVSZWNpcGllbnRzIiwidmFsaWRhdGVTZW5kQXQiLCJ2YWxpZGF0ZUF0dGFjaG1lbnRzIiwiYXBwSWRzIiwidGV4dCIsIlRSQUNLX0VNQUlMX1JFR0VYIiwidHJhY2tlZCIsIm1hdGNoIiwiRU1BSUxfUkVHRVgiLCJlbWFpbCIsInRyYWNrRW1haWwiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQW9CcUJBLFU7QUFDakIsd0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsYUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QjtBQUNuQkMsdUJBQVcsRUFEUTtBQUVuQkMsbUJBQU8sS0FBSyxJQUFMLEdBQVk7QUFGQSxTQUF2QjtBQUlIOzs7OzZDQWFvQjtBQUNqQiw2QkFBRUMsT0FBRixDQUFVLEtBQUtKLE1BQUwsQ0FBWUssYUFBdEIsRUFBcUMsVUFBQ0MsU0FBRCxFQUFlO0FBQ2hELG9CQUFJUCxXQUFXUSxjQUFYLENBQTBCRCxTQUExQixDQUFKLEVBQTBDO0FBQ3RDLDBCQUFNLHNDQUFOO0FBQ0g7QUFD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QW9DLE1BQU0seUJBQWEsUUFBYixDQUFOO0FBQ3BDLGdCQUFJLENBQUMsaUJBQUViLE9BQUYsQ0FBVSxLQUFLWixNQUFMLENBQVkrQixNQUF0QixDQUFMLEVBQW9DLE1BQU0sZ0NBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLENBQU47QUFDdkM7OzttQ0F0R2lCQyxJLEVBQU07QUFDcEIsZ0JBQU1DLG9CQUFvQixzREFBMUI7QUFDQSxnQkFBTUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXRixpQkFBWCxDQUFoQjtBQUNBLG1CQUFPQyxVQUFVQSxRQUFRLENBQVIsQ0FBVixHQUF1QixJQUE5QjtBQUNIOzs7dUNBQ3FCRixJLEVBQU07QUFDeEIsZ0JBQU1JLGNBQWMsMEVBQXBCO0FBQ0EsZ0JBQU1DLFFBQVF0QyxXQUFXdUMsVUFBWCxDQUFzQk4sSUFBdEIsQ0FBZDtBQUNBLGdCQUFJLENBQUNLLEtBQUwsRUFBWSxPQUFPLElBQVA7QUFDWixnQkFBTUUsU0FBU0YsTUFBTUYsS0FBTixDQUFZQyxXQUFaLENBQWY7QUFDQSxtQkFBT0csV0FBVyxJQUFsQjtBQUNIOzs7Ozs7a0JBbkJnQnhDLFUiLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIEludmFsaWRGcm9tLFxuICAgIE5vUmVwbHlFbWFpbCxcbiAgICBJbnZhbGlkU2VuZEF0LFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIEF0dGFjaG1lbnRzU2l6ZUxpbWl0LFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0LFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQsXG59IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5hdHRhY2hTaXplTGltaXQgPSB7XG4gICAgICAgICAgICBtZWdhYnl0ZXM6IDEwLFxuICAgICAgICAgICAgYnl0ZXM6IDEwICogMTAyNCAqIDEwMjQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyB0cmFja0VtYWlsKHRleHQpIHtcbiAgICAgICAgY29uc3QgVFJBQ0tfRU1BSUxfUkVHRVggPSAvKFthLXpBLVowLTkuXy1dK0BbYS16QS1aMC05Ll8tXStcXC5bYS16QS1aMC05Ll8tXSspL2dpO1xuICAgICAgICBjb25zdCB0cmFja2VkID0gdGV4dC5tYXRjaChUUkFDS19FTUFJTF9SRUdFWCk7XG4gICAgICAgIHJldHVybiB0cmFja2VkID8gdHJhY2tlZFswXSA6IG51bGw7XG4gICAgfVxuICAgIHN0YXRpYyBpc0VtYWlsSW52YWxpZCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IEVNQUlMX1JFR0VYID0gLyheW2EtekEtWjAtOS4hIyQlJuKAmSorLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05LV0rKD86XFwuW2EtekEtWjAtOS1dKykqJCkvZ2k7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gVmFsaWRhdG9ycy50cmFja0VtYWlsKHRleHQpO1xuICAgICAgICBpZiAoIWVtYWlsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZW1haWwubWF0Y2goRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsO1xuICAgIH1cbiAgICB2YWxpZGF0ZVJlY2lwaWVudHMoKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0LCAocmVjaXBpZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNpcGllbnRMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWxpZGFkZUZyb20oKSB7XG4gICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHRoaXMucGFyYW1zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZyb20oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZVNlbmRBdCgpIHtcbiAgICAgICAgaWYgKF8uaGFzKHRoaXMucGFyYW1zLCAnc2VuZEF0JykgJiYgdGhpcy5wYXJhbXMuc2VuZEF0KSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudCh0aGlzLnBhcmFtcy5zZW5kQXQsIFsnWVlZWS1NTS1ERCBISDptbTpzcyddLCB0cnVlKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlbmRBdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlQXR0YWNobWVudHMoKSB7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzKSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0KCk7XG4gICAgICAgIGxldCB0b3RhbEF0dGFjaG1lbnRzU2l6ZSA9IDA7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5hdHRhY2htZW50cywgKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhdHRhY2htZW50KSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnbmFtZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICdmaWxlJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5maWxlXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5maWxlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRmaWxlID0gYXRvYihhdHRhY2htZW50LmZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IGRmaWxlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmaWxlU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGZpbGVTaXplIC0gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXM7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaXplTGltaXQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgYXR0YWNobWVudC5uYW1lLCBkaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsQXR0YWNobWVudHNTaXplICs9IGZpbGVTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRvdGFsQXR0YWNobWVudHNTaXplID4gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB0b3RhbEF0dGFjaG1lbnRzU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2l6ZUxpbWl0KHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgZGlmZik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXR0ck5vdEluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuICFfLmhhcyh0aGlzLnBhcmFtcywgYXR0cikgfHwgIXRoaXMucGFyYW1zW2F0dHJdO1xuICAgIH1cbiAgICBhdHRySW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpICYmIHRoaXMucGFyYW1zW2F0dHJdO1xuICAgIH1cbiAgICBjaGVja01haWxQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2Zyb20nKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9SZXBseUVtYWlsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdmcm9tJykpIHRoaXMudmFsaWRhZGVGcm9tKCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50TGlzdCcpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCkpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIXRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudHMoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNlbmRBdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3ViamVjdCcpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndXNlVHBsRGVmYXVsdFN1YmplY3QnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU3ViamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JylcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0TmFtZScpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdEVtYWlsJykpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndGVtcGxhdGVTbHVnJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RlbXBsYXRlTm9GZWF0dXJlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnYXR0YWNobWVudHMnKSkgdGhpcy52YWxpZGF0ZUF0dGFjaG1lbnRzKCk7XG4gICAgfVxuICAgIGNoZWNrU2VhcmNoUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdzdGFydCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ3N0YXJ0Jyk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnZW5kJykpIHRocm93IG5ldyBOb1BhcmFtWCgnZW5kJyk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnYXBwSWRzJykpIHRocm93IG5ldyBOb1BhcmFtWCgnYXBwSWRzJyk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmFwcElkcykpIHRocm93IG5ldyBXcm9uZ1R5cGVQYXJhbVgoJ0FycmF5JywgJ2FwcElkcycpO1xuICAgIH1cbn1cbiJdfQ==
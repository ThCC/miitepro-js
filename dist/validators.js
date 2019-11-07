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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsInRvdGFsRW1haWxMaW1pdCIsIl8iLCJmb3JFYWNoIiwicmVjaXBpZW50TGlzdCIsInJlY2lwaWVudCIsImlzRW1haWxGb3JtYXRJbnZhbGlkIiwiSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QiLCJpc0VtYWlsSW52YWxpZCIsIkludmFsaWRSZWNpcGllbnRMaXN0IiwiZnJvbSIsIkludmFsaWRGcm9tRm9ybWF0IiwiSW52YWxpZEZyb20iLCJoYXMiLCJzZW5kQXQiLCJpc1ZhbGlkIiwiSW52YWxpZFNlbmRBdEZvcm1hdCIsImlzQmVmb3JlIiwiU2VuZEF0TG93ZXJUaGFuVG9kYXkiLCJpc0FycmF5IiwiYXR0YWNobWVudHMiLCJBdHRhY2htZW50c1Nob3VsZEJlTGlzdCIsInRvdGFsQXR0YWNobWVudHNTaXplIiwiYXR0YWNobWVudCIsImlzT2JqZWN0IiwiQXR0YWNobWVudFNob3VsZEJlT2JqZWN0IiwibmFtZSIsIkF0dGFjaG1lbnRTaG91bGRIYXZlTmFtZSIsImZpbGUiLCJBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUiLCJkZmlsZSIsImUiLCJBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0IiwiZmlsZVNpemUiLCJsZW5ndGgiLCJkaWZmIiwiQXR0YWNobWVudFNpemVMaW1pdCIsIkF0dGFjaG1lbnRzU2l6ZUxpbWl0IiwiYXR0ciIsImF0dHJOb3RJblBhcmFtcyIsImhlYWRlcnMiLCJQYXJhbXNTaG91bGRCZU9iamVjdCIsIk5vUmVwbHlFbWFpbCIsImF0dHJJblBhcmFtcyIsInZhbGlkYWRlRnJvbSIsIk5vUmVjaXBpZW50IiwidmFsaWRhdGVSZWNpcGllbnRzIiwidmFsaWRhdGVTZW5kQXQiLCJOb1N1YmplY3QiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsInZhbGlkYXRlQXR0YWNobWVudHMiLCJOb1BhcmFtWCIsImFwcElkcyIsIldyb25nVHlwZVBhcmFtWCIsInRleHQiLCJUUkFDS19FTUFJTF9SRUdFWCIsInRyYWNrZWQiLCJtYXRjaCIsImVtYWlsIiwidHJhY2tFbWFpbCIsIkVNQUlMX1JFR0VYIiwicmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUF1QnFCQSxVO0FBQ2pCLHdCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGFBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLGVBQUwsR0FBdUI7QUFDbkJDLHVCQUFXLEVBRFE7QUFFbkJDLG1CQUFPLEtBQUssSUFBTCxHQUFZO0FBRkEsU0FBdkI7QUFJQSxhQUFLQyxlQUFMLEdBQXVCLEdBQXZCO0FBQ0g7Ozs7NkNBb0JvQjtBQUNqQkMsNkJBQUVDLE9BQUYsQ0FBVSxLQUFLTixNQUFMLENBQVlPLGFBQXRCLEVBQXFDLFVBQUNDLFNBQUQsRUFBZTtBQUNoRCxvQkFBSVQsV0FBV1Usb0JBQVgsQ0FBZ0NELFNBQWhDLENBQUosRUFBZ0Q7QUFDNUMsMEJBQU0sSUFBSUUsc0NBQUosRUFBTjtBQUNIO0FBQ0Qsb0JBQUlYLFdBQVdZLGNBQVgsQ0FBMEJILFNBQTFCLENBQUosRUFBMEM7QUFDdEMsMEJBQU0sSUFBSUksZ0NBQUosQ0FBeUJKLFNBQXpCLENBQU47QUFDSDtBQUNKLGFBUEQ7QUFRSDs7O3VDQUVjO0FBQ1gsZ0JBQUlULFdBQVdVLG9CQUFYLENBQWdDLEtBQUtULE1BQUwsQ0FBWWEsSUFBNUMsQ0FBSixFQUF1RDtBQUNuRCxzQkFBTSxJQUFJQyw2QkFBSixFQUFOO0FBQ0g7QUFDRCxnQkFBSWYsV0FBV1ksY0FBWCxDQUEwQixLQUFLWCxNQUFMLENBQVlhLElBQXRDLENBQUosRUFBaUQ7QUFDN0Msc0JBQU0sSUFBSUUsdUJBQUosRUFBTjtBQUNIO0FBQ0o7Ozt5Q0FFZ0I7QUFDYixnQkFBSVYsaUJBQUVXLEdBQUYsQ0FBTSxLQUFLaEIsTUFBWCxFQUFtQixRQUFuQixLQUFnQyxLQUFLQSxNQUFMLENBQVlpQixNQUFoRCxFQUF3RDtBQUNwRCxvQkFBSSxDQUFDLHNCQUFPLEtBQUtqQixNQUFMLENBQVlpQixNQUFuQixFQUEyQixDQUFDLHFCQUFELENBQTNCLEVBQW9ELElBQXBELEVBQTBEQyxPQUExRCxFQUFMLEVBQTBFO0FBQ3RFLDBCQUFNLElBQUlDLCtCQUFKLEVBQU47QUFDSDtBQUNELG9CQUFJLHNCQUFPLEtBQUtuQixNQUFMLENBQVlpQixNQUFuQixFQUEyQkcsUUFBM0IsQ0FBb0MsdUJBQXBDLENBQUosRUFBbUQ7QUFDL0MsMEJBQU0sSUFBSUMsZ0NBQUosRUFBTjtBQUNIO0FBQ0o7QUFDSjs7OzhDQUVxQjtBQUFBOztBQUNsQixnQkFBSSxDQUFDaEIsaUJBQUVpQixPQUFGLENBQVUsS0FBS3RCLE1BQUwsQ0FBWXVCLFdBQXRCLENBQUwsRUFBeUMsTUFBTSxJQUFJQyxtQ0FBSixFQUFOO0FBQ3pDLGdCQUFJQyx1QkFBdUIsQ0FBM0I7QUFDQXBCLDZCQUFFQyxPQUFGLENBQVUsS0FBS04sTUFBTCxDQUFZdUIsV0FBdEIsRUFBbUMsVUFBQ0csVUFBRCxFQUFnQjtBQUMvQyxvQkFBSSxDQUFDckIsaUJBQUVzQixRQUFGLENBQVdELFVBQVgsQ0FBTCxFQUE2QixNQUFNLElBQUlFLG9DQUFKLEVBQU47QUFDN0Isb0JBQUksQ0FBQ3ZCLGlCQUFFVyxHQUFGLENBQU1VLFVBQU4sRUFBa0IsTUFBbEIsQ0FBRCxJQUNHLENBQUNBLFdBQVdHLElBRGYsSUFFR0gsV0FBV0csSUFBWCxLQUFvQixFQUYzQixFQUUrQjtBQUMzQiwwQkFBTSxJQUFJQyxvQ0FBSixFQUFOO0FBQ0g7QUFDRCxvQkFBSSxDQUFDekIsaUJBQUVXLEdBQUYsQ0FBTVUsVUFBTixFQUFrQixNQUFsQixDQUFELElBQ0csQ0FBQ0EsV0FBV0ssSUFEZixJQUVHTCxXQUFXSyxJQUFYLEtBQW9CLEVBRjNCLEVBRStCO0FBQzNCLDBCQUFNLElBQUlDLG9DQUFKLEVBQU47QUFDSDtBQUNELG9CQUFJQyxRQUFRLElBQVo7QUFDQSxvQkFBSTtBQUNBQSw0QkFBUSxvQkFBS1AsV0FBV0ssSUFBaEIsQ0FBUjtBQUNILGlCQUZELENBRUUsT0FBT0csQ0FBUCxFQUFVO0FBQ1IsMEJBQU0sSUFBSUMsd0NBQUosRUFBTjtBQUNIO0FBQ0Qsb0JBQU1DLFdBQVdILE1BQU1JLE1BQXZCO0FBQ0Esb0JBQUlELFdBQVcsTUFBS25DLGVBQUwsQ0FBcUJFLEtBQXBDLEVBQTJDO0FBQ3ZDLHdCQUFNbUMsT0FBT0YsV0FBVyxNQUFLbkMsZUFBTCxDQUFxQkUsS0FBN0M7QUFDQSwwQkFBTSxJQUFJb0MsK0JBQUosQ0FDRixNQUFLdEMsZUFBTCxDQUFxQkMsU0FEbkIsRUFDOEJ3QixXQUFXRyxJQUR6QyxFQUMrQ1MsSUFEL0MsQ0FBTjtBQUVIO0FBQ0RiLHdDQUF3QlcsUUFBeEI7QUFDSCxhQXpCRDtBQTBCQSxnQkFBSVgsdUJBQXVCLEtBQUt4QixlQUFMLENBQXFCRSxLQUFoRCxFQUF1RDtBQUNuRCxvQkFBTW1DLE9BQU9iLHVCQUF1QixLQUFLeEIsZUFBTCxDQUFxQkUsS0FBekQ7QUFDQSxzQkFBTSxJQUFJcUMsZ0NBQUosQ0FBeUIsS0FBS3ZDLGVBQUwsQ0FBcUJDLFNBQTlDLEVBQXlEb0MsSUFBekQsQ0FBTjtBQUNIO0FBQ0o7Ozt3Q0FFZUcsSSxFQUFNO0FBQ2xCLG1CQUFPLENBQUNwQyxpQkFBRVcsR0FBRixDQUFNLEtBQUtoQixNQUFYLEVBQW1CeUMsSUFBbkIsQ0FBRCxJQUE2QixDQUFDLEtBQUt6QyxNQUFMLENBQVl5QyxJQUFaLENBQXJDO0FBQ0g7OztxQ0FFWUEsSSxFQUFNO0FBQ2YsbUJBQU9wQyxpQkFBRVcsR0FBRixDQUFNLEtBQUtoQixNQUFYLEVBQW1CeUMsSUFBbkIsS0FBNEIsS0FBS3pDLE1BQUwsQ0FBWXlDLElBQVosQ0FBbkM7QUFDSDs7O3lDQUVnQkEsSSxFQUFNO0FBQ25CLGdCQUFJLEtBQUtDLGVBQUwsQ0FBcUIsU0FBckIsQ0FBSixFQUFxQyxPQUFPLElBQVA7QUFDckMsbUJBQU8sQ0FBQ3JDLGlCQUFFVyxHQUFGLENBQU0sS0FBS2hCLE1BQUwsQ0FBWTJDLE9BQWxCLEVBQTJCRixJQUEzQixDQUFELElBQXFDLENBQUMsS0FBS3pDLE1BQUwsQ0FBWTJDLE9BQVosQ0FBb0JGLElBQXBCLENBQTdDO0FBQ0g7OztzQ0FFYUEsSSxFQUFNO0FBQ2hCLGdCQUFJLEtBQUtDLGVBQUwsQ0FBcUIsU0FBckIsQ0FBSixFQUFxQyxPQUFPLEtBQVA7QUFDckMsbUJBQU9yQyxpQkFBRVcsR0FBRixDQUFNLEtBQUtoQixNQUFMLENBQVkyQyxPQUFsQixFQUEyQkYsSUFBM0IsS0FBb0MsS0FBS3pDLE1BQUwsQ0FBWTJDLE9BQVosQ0FBb0JGLElBQXBCLENBQTNDO0FBQ0g7OzswQ0FFaUI7QUFDZCxnQkFBSSxDQUFDcEMsaUJBQUVzQixRQUFGLENBQVcsS0FBSzNCLE1BQWhCLENBQUwsRUFBOEIsTUFBTSxJQUFJNEMsZ0NBQUosRUFBTjtBQUM5QixnQkFBSSxLQUFLRixlQUFMLENBQXFCLE1BQXJCLEtBQ0csS0FBS0EsZUFBTCxDQUFxQixvQkFBckIsQ0FEUCxFQUNtRDtBQUMvQyxzQkFBTSxJQUFJRyx3QkFBSixFQUFOO0FBQ0g7QUFDRCxnQkFBSSxLQUFLQyxZQUFMLENBQWtCLE1BQWxCLENBQUosRUFBK0IsS0FBS0MsWUFBTDtBQUMvQixnQkFBSSxLQUFLTCxlQUFMLENBQXFCLGVBQXJCLENBQUosRUFBMkMsTUFBTSxJQUFJTSx1QkFBSixFQUFOO0FBQzNDLGdCQUFJLENBQUMzQyxpQkFBRWlCLE9BQUYsQ0FBVSxLQUFLdEIsTUFBTCxDQUFZTyxhQUF0QixDQUFMLEVBQTJDLE1BQU0sSUFBSXlDLHVCQUFKLEVBQU47QUFDM0MsZ0JBQUksQ0FBQyxLQUFLaEQsTUFBTCxDQUFZTyxhQUFaLENBQTBCOEIsTUFBL0IsRUFBdUMsTUFBTSxJQUFJVyx1QkFBSixFQUFOO0FBQ3ZDLGlCQUFLQyxrQkFBTDtBQUNBLGlCQUFLQyxjQUFMOztBQUVBLGdCQUFJLEtBQUtSLGVBQUwsQ0FBcUIsU0FBckIsS0FDRyxLQUFLQSxlQUFMLENBQXFCLHNCQUFyQixDQURQLEVBQ3FEO0FBQ2pELHNCQUFNLElBQUlTLHFCQUFKLEVBQU47QUFDSDtBQUNELGdCQUFJLENBQUMsS0FBS0wsWUFBTCxDQUFrQixzQkFBbEIsS0FDRSxLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixDQURGLElBRUUsS0FBS0EsWUFBTCxDQUFrQixvQkFBbEIsQ0FGSCxLQUdHLEtBQUtKLGVBQUwsQ0FBcUIsY0FBckIsQ0FIUCxFQUc2QztBQUN6QyxzQkFBTSxJQUFJVSxnQ0FBSixFQUFOO0FBQ0g7QUFDRCxnQkFBSSxLQUFLTixZQUFMLENBQWtCLGFBQWxCLENBQUosRUFBc0MsS0FBS08sbUJBQUw7QUFDekM7Ozs0Q0FFbUI7QUFDaEIsZ0JBQUksQ0FBQ2hELGlCQUFFc0IsUUFBRixDQUFXLEtBQUszQixNQUFoQixDQUFMLEVBQThCLE1BQU0sSUFBSTRDLGdDQUFKLEVBQU47QUFDOUIsZ0JBQUksS0FBS0YsZUFBTCxDQUFxQixPQUFyQixDQUFKLEVBQW1DLE1BQU0sSUFBSVksb0JBQUosQ0FBYSxPQUFiLENBQU47QUFDbkMsZ0JBQUksS0FBS1osZUFBTCxDQUFxQixLQUFyQixDQUFKLEVBQWlDLE1BQU0sSUFBSVksb0JBQUosQ0FBYSxLQUFiLENBQU47QUFDakMsZ0JBQUksS0FBS1osZUFBTCxDQUFxQixRQUFyQixDQUFKLEVBQW9DLE1BQU0sSUFBSVksb0JBQUosQ0FBYSxRQUFiLENBQU47QUFDcEMsZ0JBQUksQ0FBQ2pELGlCQUFFaUIsT0FBRixDQUFVLEtBQUt0QixNQUFMLENBQVl1RCxNQUF0QixDQUFMLEVBQW9DLE1BQU0sSUFBSUMsMkJBQUosQ0FBb0IsT0FBcEIsRUFBNkIsUUFBN0IsQ0FBTjtBQUN2Qzs7O21DQXRJaUJDLEksRUFBTTtBQUNwQixnQkFBTUMsb0JBQW9CLHNEQUExQjtBQUNBLGdCQUFNQyxVQUFVRixLQUFLRyxLQUFMLENBQVdGLGlCQUFYLENBQWhCO0FBQ0EsbUJBQU9DLFVBQVVBLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBQTlCO0FBQ0g7Ozs2Q0FFMkJGLEksRUFBTTtBQUM5QixnQkFBTUksUUFBUTlELFdBQVcrRCxVQUFYLENBQXNCTCxJQUF0QixDQUFkO0FBQ0EsbUJBQU9JLFVBQVUsSUFBakI7QUFDSDs7O3VDQUVxQkosSSxFQUFNO0FBQ3hCLGdCQUFNTSxjQUFjLG9EQUFwQjtBQUNBLGdCQUFNRixRQUFROUQsV0FBVytELFVBQVgsQ0FBc0JMLElBQXRCLENBQWQ7QUFDQSxnQkFBTU8sU0FBU0gsTUFBTUQsS0FBTixDQUFZRyxXQUFaLENBQWY7QUFDQSxtQkFBT0MsV0FBVyxJQUFsQjtBQUNIOzs7Ozs7a0JBMUJnQmpFLFUiLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIEludmFsaWRGcm9tLFxuICAgIE5vUmVwbHlFbWFpbCxcbiAgICBXcm9uZ1R5cGVQYXJhbVgsXG4gICAgSW52YWxpZEZyb21Gb3JtYXQsXG4gICAgSW52YWxpZFNlbmRBdEZvcm1hdCxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIFNlbmRBdExvd2VyVGhhblRvZGF5LFxuICAgIEF0dGFjaG1lbnRzU2l6ZUxpbWl0LFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0LFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0LFxuICAgIEF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQsXG59IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5hdHRhY2hTaXplTGltaXQgPSB7XG4gICAgICAgICAgICBtZWdhYnl0ZXM6IDEwLFxuICAgICAgICAgICAgYnl0ZXM6IDEwICogMTAyNCAqIDEwMjQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG90YWxFbWFpbExpbWl0ID0gNTAwO1xuICAgIH1cblxuICAgIHN0YXRpYyB0cmFja0VtYWlsKHRleHQpIHtcbiAgICAgICAgY29uc3QgVFJBQ0tfRU1BSUxfUkVHRVggPSAvKFthLXpBLVowLTkuXy1dK0BbYS16QS1aMC05Ll8tXStcXC5bYS16QS1aMC05Ll8tXSspL2dpO1xuICAgICAgICBjb25zdCB0cmFja2VkID0gdGV4dC5tYXRjaChUUkFDS19FTUFJTF9SRUdFWCk7XG4gICAgICAgIHJldHVybiB0cmFja2VkID8gdHJhY2tlZFswXSA6IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRW1haWxGb3JtYXRJbnZhbGlkKHRleHQpIHtcbiAgICAgICAgY29uc3QgZW1haWwgPSBWYWxpZGF0b3JzLnRyYWNrRW1haWwodGV4dCk7XG4gICAgICAgIHJldHVybiBlbWFpbCA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNFbWFpbEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBFTUFJTF9SRUdFWCA9IC9eW2EtekEtWjAtOV8uKy1dK0BbYS16QS1aMC05LV0rXFwuW2EtekEtWjAtOS0uXSskL2dpO1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZW1haWwubWF0Y2goRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUmVjaXBpZW50cygpIHtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QsIChyZWNpcGllbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxGb3JtYXRJbnZhbGlkKHJlY2lwaWVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHJlY2lwaWVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFJlY2lwaWVudExpc3QocmVjaXBpZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhZGVGcm9tKCkge1xuICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsRm9ybWF0SW52YWxpZCh0aGlzLnBhcmFtcy5mcm9tKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGcm9tRm9ybWF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVTZW5kQXQoKSB7XG4gICAgICAgIGlmIChfLmhhcyh0aGlzLnBhcmFtcywgJ3NlbmRBdCcpICYmIHRoaXMucGFyYW1zLnNlbmRBdCkge1xuICAgICAgICAgICAgaWYgKCFtb21lbnQodGhpcy5wYXJhbXMuc2VuZEF0LCBbJ1lZWVktTU0tREQgSEg6bW06c3MnXSwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTZW5kQXRGb3JtYXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb21lbnQodGhpcy5wYXJhbXMuc2VuZEF0KS5pc0JlZm9yZShtb21lbnQoKSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2VuZEF0TG93ZXJUaGFuVG9kYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlQXR0YWNobWVudHMoKSB7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzKSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0KCk7XG4gICAgICAgIGxldCB0b3RhbEF0dGFjaG1lbnRzU2l6ZSA9IDA7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5hdHRhY2htZW50cywgKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhdHRhY2htZW50KSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnbmFtZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICdmaWxlJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5maWxlXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5maWxlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRmaWxlID0gYXRvYihhdHRhY2htZW50LmZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IGRmaWxlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmaWxlU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGZpbGVTaXplIC0gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXM7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaXplTGltaXQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgYXR0YWNobWVudC5uYW1lLCBkaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsQXR0YWNobWVudHNTaXplICs9IGZpbGVTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRvdGFsQXR0YWNobWVudHNTaXplID4gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB0b3RhbEF0dGFjaG1lbnRzU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2l6ZUxpbWl0KHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgZGlmZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRyTm90SW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gIV8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSB8fCAhdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuXG4gICAgYXR0ckluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSAmJiB0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG5cbiAgICBhdHRyTm90SW5IZWFkZXJzKGF0dHIpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdoZWFkZXJzJykpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gIV8uaGFzKHRoaXMucGFyYW1zLmhlYWRlcnMsIGF0dHIpIHx8ICF0aGlzLnBhcmFtcy5oZWFkZXJzW2F0dHJdO1xuICAgIH1cblxuICAgIGF0dHJJbkhlYWRlcnMoYXR0cikge1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2hlYWRlcnMnKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gXy5oYXModGhpcy5wYXJhbXMuaGVhZGVycywgYXR0cikgJiYgdGhpcy5wYXJhbXMuaGVhZGVyc1thdHRyXTtcbiAgICB9XG5cbiAgICBjaGVja01haWxQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2Zyb20nKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9SZXBseUVtYWlsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdmcm9tJykpIHRoaXMudmFsaWRhZGVGcm9tKCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50TGlzdCcpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCkpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIXRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudHMoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNlbmRBdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3ViamVjdCcpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndXNlVHBsRGVmYXVsdFN1YmplY3QnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU3ViamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JylcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0TmFtZScpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdEVtYWlsJykpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndGVtcGxhdGVTbHVnJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1RlbXBsYXRlTm9GZWF0dXJlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnYXR0YWNobWVudHMnKSkgdGhpcy52YWxpZGF0ZUF0dGFjaG1lbnRzKCk7XG4gICAgfVxuXG4gICAgY2hlY2tTZWFyY2hQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N0YXJ0JykpIHRocm93IG5ldyBOb1BhcmFtWCgnc3RhcnQnKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdlbmQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdlbmQnKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdhcHBJZHMnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdhcHBJZHMnKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMuYXBwSWRzKSkgdGhyb3cgbmV3IFdyb25nVHlwZVBhcmFtWCgnQXJyYXknLCAnYXBwSWRzJyk7XG4gICAgfVxufVxuIl19
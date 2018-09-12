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
                if (this.attrNotInParams('batchs')) throw new _exceptions.InvalidBatch();
                if (!_lodash2.default.isNumber(this.params.batchs)) throw new _exceptions.InvalidBatch();
                if (this.attrNotInParams('timeBetweenBatchs')) throw new _exceptions.InvalidTimeBetweemBatchs();
                if (!_lodash2.default.isNumber(this.params.timeBetweenBatchs)) throw new _exceptions.InvalidTimeBetweemBatchs();
                if (this.params.batchs < this.batchMinSize) throw new _exceptions.BatchLowerThan2();
                if (this.params.timeBetweenBatchs < this.batchMinTime) {
                    throw new _exceptions.TimeBetweemBatchsLessThan5();
                }
                var batchs = _lodash2.default.floor(this.params.batchs);
                var tempTime = _lodash2.default.floor(this.params.timeBetweenBatchs);
                var timeBetweenBatchs = this.batchMinTime * _lodash2.default.floor(tempTime / this.batchMinTime);

                if (batchs < this.batchMinSize) throw new _exceptions.InvalidBatch();
                if (timeBetweenBatchs < this.batchMinTime) throw new _exceptions.InvalidTimeBetweemBatchs();
                this.params.batchs = batchs;
                this.params.timeBetweenBatchs = timeBetweenBatchs;

                var systemTakeOver = null;
                var lastBatchPlusOne = null;
                if (this.attrInParams('headers')) {
                    if (_lodash2.default.has(this.params.headers, 'system_take_over') && this.params.headers.system_take_over) {
                        systemTakeOver = this.params.headers.system_take_over;
                    }
                    if (_lodash2.default.has(this.params.headers, 'last_batch_plus_one') && this.params.headers.last_batch_plus_one) {
                        lastBatchPlusOne = this.params.headers.last_batch_plus_one;
                    }
                }

                if (systemTakeOver === null && lastBatchPlusOne === null) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2hTaXplTGltaXQiLCJtZWdhYnl0ZXMiLCJieXRlcyIsImJhdGNoTWluU2l6ZSIsImJhdGNoTWluVGltZSIsInRvdGFsRW1haWxMaW1pdCIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEZvcm1hdEludmFsaWQiLCJpc0VtYWlsSW52YWxpZCIsImJhdGNocyIsImF0dHJJblBhcmFtcyIsInRvdGFsUmVjaXBpZW50cyIsImxlbmd0aCIsImZyb20iLCJoYXMiLCJzZW5kQXQiLCJpc1ZhbGlkIiwiaXNBcnJheSIsImF0dGFjaG1lbnRzIiwidG90YWxBdHRhY2htZW50c1NpemUiLCJhdHRhY2htZW50IiwiaXNPYmplY3QiLCJuYW1lIiwiZmlsZSIsImRmaWxlIiwiZSIsImZpbGVTaXplIiwiZGlmZiIsImF0dHJOb3RJblBhcmFtcyIsImlzTnVtYmVyIiwidGltZUJldHdlZW5CYXRjaHMiLCJmbG9vciIsInRlbXBUaW1lIiwic3lzdGVtVGFrZU92ZXIiLCJsYXN0QmF0Y2hQbHVzT25lIiwiaGVhZGVycyIsInN5c3RlbV90YWtlX292ZXIiLCJsYXN0X2JhdGNoX3BsdXNfb25lIiwiYmF0Y2hzU2l6ZSIsImF0dHIiLCJ2YWxpZGFkZUZyb20iLCJ2YWxpZGF0ZUJhdGNoc0FyZ3MiLCJ2YWxpZGF0ZVJlY2lwaWVudHMiLCJ2YWxpZGF0ZVNlbmRBdCIsInZhbGlkYXRlQXR0YWNobWVudHMiLCJhcHBJZHMiLCJ0ZXh0IiwiVFJBQ0tfRU1BSUxfUkVHRVgiLCJ0cmFja2VkIiwibWF0Y2giLCJlbWFpbCIsInRyYWNrRW1haWwiLCJFTUFJTF9SRUdFWCIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBNkJxQkEsVTtBQUNqQix3QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNoQixhQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxlQUFMLEdBQXVCO0FBQ25CQyx1QkFBVyxFQURRO0FBRW5CQyxtQkFBTyxLQUFLLElBQUwsR0FBWTtBQUZBLFNBQXZCO0FBSUEsYUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLGFBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxhQUFLQyxlQUFMLEdBQXVCLEdBQXZCO0FBQ0g7Ozs7NkNBZ0JvQjtBQUNqQiw2QkFBRUMsT0FBRixDQUFVLEtBQUtQLE1BQUwsQ0FBWVEsYUFBdEIsRUFBcUMsVUFBQ0MsU0FBRCxFQUFlO0FBQ2hELG9CQUFJVixXQUFXVyxvQkFBWCxDQUFnQ0QsU0FBaEMsQ0FBSixFQUFnRDtBQUM1QywwQkFBTSw0Q0FBTjtBQUNIO0FBQ0Qsb0JBQUlWLFdBQVdZLGNBQVgsQ0FBMEJGLFNBQTFCLENBQUosRUFBMEM7QUFDdEMsMEJBQU0scUNBQXlCQSxTQUF6QixDQUFOO0FBQ0g7QUFDSixhQVBEOztBQVNBLGdCQUFNRyxTQUFTLEtBQUtDLFlBQUwsQ0FBa0IsUUFBbEIsSUFBOEIsS0FBS2IsTUFBTCxDQUFZWSxNQUExQyxHQUFtRCxJQUFsRTtBQUNBLGdCQUFNRSxrQkFBa0IsS0FBS2QsTUFBTCxDQUFZUSxhQUFaLENBQTBCTyxNQUFsRDtBQUNBLGdCQUFJSCxXQUFXLElBQVgsSUFBbUJFLGtCQUFrQixLQUFLUixlQUE5QyxFQUErRDtBQUMzRCxzQkFBTSxnQ0FBb0JRLGVBQXBCLENBQU47QUFDSDtBQUNKOzs7dUNBQ2M7QUFDWCxnQkFBSWYsV0FBV1csb0JBQVgsQ0FBZ0MsS0FBS1YsTUFBTCxDQUFZZ0IsSUFBNUMsQ0FBSixFQUF1RDtBQUNuRCxzQkFBTSxtQ0FBTjtBQUNIO0FBQ0QsZ0JBQUlqQixXQUFXWSxjQUFYLENBQTBCLEtBQUtYLE1BQUwsQ0FBWWdCLElBQXRDLENBQUosRUFBaUQ7QUFDN0Msc0JBQU0sNkJBQU47QUFDSDtBQUNKOzs7eUNBQ2dCO0FBQ2IsZ0JBQUksaUJBQUVDLEdBQUYsQ0FBTSxLQUFLakIsTUFBWCxFQUFtQixRQUFuQixLQUFnQyxLQUFLQSxNQUFMLENBQVlrQixNQUFoRCxFQUF3RDtBQUNwRCxvQkFBSSxDQUFDLHNCQUFPLEtBQUtsQixNQUFMLENBQVlrQixNQUFuQixFQUEyQixDQUFDLHFCQUFELENBQTNCLEVBQW9ELElBQXBELEVBQTBEQyxPQUExRCxFQUFMLEVBQTBFO0FBQ3RFLDBCQUFNLCtCQUFOO0FBQ0g7QUFDSjtBQUNKOzs7OENBQ3FCO0FBQUE7O0FBQ2xCLGdCQUFJLENBQUMsaUJBQUVDLE9BQUYsQ0FBVSxLQUFLcEIsTUFBTCxDQUFZcUIsV0FBdEIsQ0FBTCxFQUF5QyxNQUFNLHlDQUFOO0FBQ3pDLGdCQUFJQyx1QkFBdUIsQ0FBM0I7QUFDQSw2QkFBRWYsT0FBRixDQUFVLEtBQUtQLE1BQUwsQ0FBWXFCLFdBQXRCLEVBQW1DLFVBQUNFLFVBQUQsRUFBZ0I7QUFDL0Msb0JBQUksQ0FBQyxpQkFBRUMsUUFBRixDQUFXRCxVQUFYLENBQUwsRUFBNkIsTUFBTSwwQ0FBTjtBQUM3QixvQkFBSSxDQUFDLGlCQUFFTixHQUFGLENBQU1NLFVBQU4sRUFBa0IsTUFBbEIsQ0FBRCxJQUNHLENBQUNBLFdBQVdFLElBRGYsSUFFR0YsV0FBV0UsSUFBWCxLQUFvQixFQUYzQixFQUUrQjtBQUMzQiwwQkFBTSwwQ0FBTjtBQUNIO0FBQ0Qsb0JBQUksQ0FBQyxpQkFBRVIsR0FBRixDQUFNTSxVQUFOLEVBQWtCLE1BQWxCLENBQUQsSUFDRyxDQUFDQSxXQUFXRyxJQURmLElBRUdILFdBQVdHLElBQVgsS0FBb0IsRUFGM0IsRUFFK0I7QUFDM0IsMEJBQU0sMENBQU47QUFDSDtBQUNELG9CQUFJQyxRQUFRLElBQVo7QUFDQSxvQkFBSTtBQUNBQSw0QkFBUSxvQkFBS0osV0FBV0csSUFBaEIsQ0FBUjtBQUNILGlCQUZELENBRUUsT0FBT0UsQ0FBUCxFQUFVO0FBQ1IsMEJBQU0sOENBQU47QUFDSDtBQUNELG9CQUFNQyxXQUFXRixNQUFNWixNQUF2QjtBQUNBLG9CQUFJYyxXQUFXLE1BQUs1QixlQUFMLENBQXFCRSxLQUFwQyxFQUEyQztBQUN2Qyx3QkFBTTJCLE9BQU9ELFdBQVcsTUFBSzVCLGVBQUwsQ0FBcUJFLEtBQTdDO0FBQ0EsMEJBQU0sb0NBQ0YsTUFBS0YsZUFBTCxDQUFxQkMsU0FEbkIsRUFDOEJxQixXQUFXRSxJQUR6QyxFQUMrQ0ssSUFEL0MsQ0FBTjtBQUVIO0FBQ0RSLHdDQUF3Qk8sUUFBeEI7QUFDSCxhQXpCRDtBQTBCQSxnQkFBSVAsdUJBQXVCLEtBQUtyQixlQUFMLENBQXFCRSxLQUFoRCxFQUF1RDtBQUNuRCxvQkFBTTJCLE9BQU9SLHVCQUF1QixLQUFLckIsZUFBTCxDQUFxQkUsS0FBekQ7QUFDQSxzQkFBTSxxQ0FBeUIsS0FBS0YsZUFBTCxDQUFxQkMsU0FBOUMsRUFBeUQ0QixJQUF6RCxDQUFOO0FBQ0g7QUFDSjs7OzZDQUNvQjtBQUNqQixnQkFBSSxLQUFLakIsWUFBTCxDQUFrQixRQUFsQixLQUErQixLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixDQUFuQyxFQUEyRTtBQUN2RSxvQkFBSSxLQUFLa0IsZUFBTCxDQUFxQixRQUFyQixDQUFKLEVBQW9DLE1BQU0sOEJBQU47QUFDcEMsb0JBQUksQ0FBQyxpQkFBRUMsUUFBRixDQUFXLEtBQUtoQyxNQUFMLENBQVlZLE1BQXZCLENBQUwsRUFBcUMsTUFBTSw4QkFBTjtBQUNyQyxvQkFBSSxLQUFLbUIsZUFBTCxDQUFxQixtQkFBckIsQ0FBSixFQUErQyxNQUFNLDBDQUFOO0FBQy9DLG9CQUFJLENBQUMsaUJBQUVDLFFBQUYsQ0FBVyxLQUFLaEMsTUFBTCxDQUFZaUMsaUJBQXZCLENBQUwsRUFBZ0QsTUFBTSwwQ0FBTjtBQUNoRCxvQkFBSSxLQUFLakMsTUFBTCxDQUFZWSxNQUFaLEdBQXFCLEtBQUtSLFlBQTlCLEVBQTRDLE1BQU0saUNBQU47QUFDNUMsb0JBQUksS0FBS0osTUFBTCxDQUFZaUMsaUJBQVosR0FBZ0MsS0FBSzVCLFlBQXpDLEVBQXVEO0FBQ25ELDBCQUFNLDRDQUFOO0FBQ0g7QUFDRCxvQkFBTU8sU0FBUyxpQkFBRXNCLEtBQUYsQ0FBUSxLQUFLbEMsTUFBTCxDQUFZWSxNQUFwQixDQUFmO0FBQ0Esb0JBQU11QixXQUFXLGlCQUFFRCxLQUFGLENBQVEsS0FBS2xDLE1BQUwsQ0FBWWlDLGlCQUFwQixDQUFqQjtBQUNBLG9CQUFNQSxvQkFBb0IsS0FBSzVCLFlBQUwsR0FBb0IsaUJBQUU2QixLQUFGLENBQVFDLFdBQVcsS0FBSzlCLFlBQXhCLENBQTlDOztBQUVBLG9CQUFJTyxTQUFTLEtBQUtSLFlBQWxCLEVBQWdDLE1BQU0sOEJBQU47QUFDaEMsb0JBQUk2QixvQkFBb0IsS0FBSzVCLFlBQTdCLEVBQTJDLE1BQU0sMENBQU47QUFDM0MscUJBQUtMLE1BQUwsQ0FBWVksTUFBWixHQUFxQkEsTUFBckI7QUFDQSxxQkFBS1osTUFBTCxDQUFZaUMsaUJBQVosR0FBZ0NBLGlCQUFoQzs7QUFFQSxvQkFBSUcsaUJBQWlCLElBQXJCO0FBQ0Esb0JBQUlDLG1CQUFtQixJQUF2QjtBQUNBLG9CQUFJLEtBQUt4QixZQUFMLENBQWtCLFNBQWxCLENBQUosRUFBa0M7QUFDOUIsd0JBQUksaUJBQUVJLEdBQUYsQ0FBTSxLQUFLakIsTUFBTCxDQUFZc0MsT0FBbEIsRUFBMkIsa0JBQTNCLEtBQ0csS0FBS3RDLE1BQUwsQ0FBWXNDLE9BQVosQ0FBb0JDLGdCQUQzQixFQUM2QztBQUN6Q0gseUNBQWlCLEtBQUtwQyxNQUFMLENBQVlzQyxPQUFaLENBQW9CQyxnQkFBckM7QUFDSDtBQUNELHdCQUFJLGlCQUFFdEIsR0FBRixDQUFNLEtBQUtqQixNQUFMLENBQVlzQyxPQUFsQixFQUEyQixxQkFBM0IsS0FDRyxLQUFLdEMsTUFBTCxDQUFZc0MsT0FBWixDQUFvQkUsbUJBRDNCLEVBQ2dEO0FBQzVDSCwyQ0FBbUIsS0FBS3JDLE1BQUwsQ0FBWXNDLE9BQVosQ0FBb0JFLG1CQUF2QztBQUNIO0FBQ0o7O0FBRUQsb0JBQUlKLG1CQUFtQixJQUFuQixJQUEyQkMscUJBQXFCLElBQXBELEVBQTBEO0FBQ3RELHdCQUFNdkIsa0JBQWtCLEtBQUtkLE1BQUwsQ0FBWVEsYUFBWixDQUEwQk8sTUFBbEQ7QUFDQSx3QkFBTTBCLGFBQWEsaUJBQUVQLEtBQUYsQ0FBUXBCLGtCQUFrQixLQUFLZCxNQUFMLENBQVlZLE1BQXRDLENBQW5COztBQUVBLHdCQUFJNkIsYUFBYSxLQUFLbkMsZUFBdEIsRUFBdUM7QUFDbkMsOEJBQU0sK0JBQW1CLEtBQUtBLGVBQXhCLENBQU47QUFDSDtBQUNELHdCQUFLbUMsYUFBYTdCLE1BQWQsS0FBMEJFLGVBQTlCLEVBQStDO0FBQzNDLDhCQUFNLDBDQUFOO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7Ozt3Q0FDZTRCLEksRUFBTTtBQUNsQixtQkFBTyxDQUFDLGlCQUFFekIsR0FBRixDQUFNLEtBQUtqQixNQUFYLEVBQW1CMEMsSUFBbkIsQ0FBRCxJQUE2QixDQUFDLEtBQUsxQyxNQUFMLENBQVkwQyxJQUFaLENBQXJDO0FBQ0g7OztxQ0FDWUEsSSxFQUFNO0FBQ2YsbUJBQU8saUJBQUV6QixHQUFGLENBQU0sS0FBS2pCLE1BQVgsRUFBbUIwQyxJQUFuQixLQUE0QixLQUFLMUMsTUFBTCxDQUFZMEMsSUFBWixDQUFuQztBQUNIOzs7MENBQ2lCO0FBQ2QsZ0JBQUksQ0FBQyxpQkFBRWxCLFFBQUYsQ0FBVyxLQUFLeEIsTUFBaEIsQ0FBTCxFQUE4QixNQUFNLHNDQUFOO0FBQzlCLGdCQUFJLEtBQUsrQixlQUFMLENBQXFCLE1BQXJCLEtBQ0csS0FBS0EsZUFBTCxDQUFxQixvQkFBckIsQ0FEUCxFQUNtRDtBQUMvQyxzQkFBTSw4QkFBTjtBQUNIO0FBQ0QsZ0JBQUksS0FBS2xCLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBSixFQUErQixLQUFLOEIsWUFBTDtBQUMvQixnQkFBSSxLQUFLWixlQUFMLENBQXFCLGVBQXJCLENBQUosRUFBMkMsTUFBTSw2QkFBTjtBQUMzQyxnQkFBSSxDQUFDLGlCQUFFWCxPQUFGLENBQVUsS0FBS3BCLE1BQUwsQ0FBWVEsYUFBdEIsQ0FBTCxFQUEyQyxNQUFNLDZCQUFOO0FBQzNDLGdCQUFJLENBQUMsS0FBS1IsTUFBTCxDQUFZUSxhQUFaLENBQTBCTyxNQUEvQixFQUF1QyxNQUFNLDZCQUFOO0FBQ3ZDLGlCQUFLNkIsa0JBQUw7QUFDQSxpQkFBS0Msa0JBQUw7QUFDQSxpQkFBS0MsY0FBTDs7QUFFQSxnQkFBSSxLQUFLZixlQUFMLENBQXFCLFNBQXJCLEtBQ0csS0FBS0EsZUFBTCxDQUFxQixzQkFBckIsQ0FEUCxFQUNxRDtBQUNqRCxzQkFBTSwyQkFBTjtBQUNIO0FBQ0QsZ0JBQUksQ0FBQyxLQUFLbEIsWUFBTCxDQUFrQixzQkFBbEIsS0FDRSxLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixDQURGLElBRUUsS0FBS0EsWUFBTCxDQUFrQixvQkFBbEIsQ0FGSCxLQUdHLEtBQUtrQixlQUFMLENBQXFCLGNBQXJCLENBSFAsRUFHNkM7QUFDekMsc0JBQU0sc0NBQU47QUFDSDtBQUNELGdCQUFJLEtBQUtsQixZQUFMLENBQWtCLGFBQWxCLENBQUosRUFBc0MsS0FBS2tDLG1CQUFMO0FBQ3pDOzs7NENBQ21CO0FBQ2hCLGdCQUFJLENBQUMsaUJBQUV2QixRQUFGLENBQVcsS0FBS3hCLE1BQWhCLENBQUwsRUFBOEIsTUFBTSxzQ0FBTjtBQUM5QixnQkFBSSxLQUFLK0IsZUFBTCxDQUFxQixPQUFyQixDQUFKLEVBQW1DLE1BQU0seUJBQWEsT0FBYixDQUFOO0FBQ25DLGdCQUFJLEtBQUtBLGVBQUwsQ0FBcUIsS0FBckIsQ0FBSixFQUFpQyxNQUFNLHlCQUFhLEtBQWIsQ0FBTjtBQUNqQyxnQkFBSSxLQUFLQSxlQUFMLENBQXFCLFFBQXJCLENBQUosRUFBb0MsTUFBTSx5QkFBYSxRQUFiLENBQU47QUFDcEMsZ0JBQUksQ0FBQyxpQkFBRVgsT0FBRixDQUFVLEtBQUtwQixNQUFMLENBQVlnRCxNQUF0QixDQUFMLEVBQW9DLE1BQU0sZ0NBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLENBQU47QUFDdkM7OzttQ0FuS2lCQyxJLEVBQU07QUFDcEIsZ0JBQU1DLG9CQUFvQixzREFBMUI7QUFDQSxnQkFBTUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXRixpQkFBWCxDQUFoQjtBQUNBLG1CQUFPQyxVQUFVQSxRQUFRLENBQVIsQ0FBVixHQUF1QixJQUE5QjtBQUNIOzs7NkNBQzJCRixJLEVBQU07QUFDOUIsZ0JBQU1JLFFBQVF0RCxXQUFXdUQsVUFBWCxDQUFzQkwsSUFBdEIsQ0FBZDtBQUNBLG1CQUFPSSxVQUFVLElBQWpCO0FBQ0g7Ozt1Q0FDcUJKLEksRUFBTTtBQUN4QixnQkFBTU0sY0FBYyxvREFBcEI7QUFDQSxnQkFBTUYsUUFBUXRELFdBQVd1RCxVQUFYLENBQXNCTCxJQUF0QixDQUFkO0FBQ0EsZ0JBQU1PLFNBQVNILE1BQU1ELEtBQU4sQ0FBWUcsV0FBWixDQUFmO0FBQ0EsbUJBQU9DLFdBQVcsSUFBbEI7QUFDSDs7Ozs7O2tCQXpCZ0J6RCxVIiwiZmlsZSI6InZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGF0b2IgZnJvbSAnYXRvYic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1xuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb1JlY2lwaWVudCxcbiAgICBJbnZhbGlkRnJvbSxcbiAgICBJbnZhbGlkQmF0Y2gsXG4gICAgTm9SZXBseUVtYWlsLFxuICAgIEludmFsaWRTZW5kQXQsXG4gICAgQmF0Y2hTaXplTGltaXQsXG4gICAgQmF0Y2hMb3dlclRoYW4yLFxuICAgIEJhdGNoSXNSZXF1aXJlZCxcbiAgICBXcm9uZ1R5cGVQYXJhbVgsXG4gICAgSW52YWxpZEZyb21Gb3JtYXQsXG4gICAgQXR0YWNobWVudFNpemVMaW1pdCxcbiAgICBBdHRhY2htZW50c1NpemVMaW1pdCxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbiAgICBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCxcbiAgICBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lLFxuICAgIEF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSxcbiAgICBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMsXG4gICAgQmF0Y2hEaXN0cmlidXRpb25JbnZhbGlkLFxuICAgIFRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41LFxuICAgIEludmFsaWRGb3JtYXRSZWNpcGllbnRMaXN0LFxuICAgIEF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQsXG59IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5hdHRhY2hTaXplTGltaXQgPSB7XG4gICAgICAgICAgICBtZWdhYnl0ZXM6IDEwLFxuICAgICAgICAgICAgYnl0ZXM6IDEwICogMTAyNCAqIDEwMjQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYmF0Y2hNaW5TaXplID0gMjtcbiAgICAgICAgdGhpcy5iYXRjaE1pblRpbWUgPSA1O1xuICAgICAgICB0aGlzLnRvdGFsRW1haWxMaW1pdCA9IDUwMDtcbiAgICB9XG4gICAgc3RhdGljIHRyYWNrRW1haWwodGV4dCkge1xuICAgICAgICBjb25zdCBUUkFDS19FTUFJTF9SRUdFWCA9IC8oW2EtekEtWjAtOS5fLV0rQFthLXpBLVowLTkuXy1dK1xcLlthLXpBLVowLTkuXy1dKykvZ2k7XG4gICAgICAgIGNvbnN0IHRyYWNrZWQgPSB0ZXh0Lm1hdGNoKFRSQUNLX0VNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHRyYWNrZWQgPyB0cmFja2VkWzBdIDogbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIGlzRW1haWxGb3JtYXRJbnZhbGlkKHRleHQpIHtcbiAgICAgICAgY29uc3QgZW1haWwgPSBWYWxpZGF0b3JzLnRyYWNrRW1haWwodGV4dCk7XG4gICAgICAgIHJldHVybiBlbWFpbCA9PT0gbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIGlzRW1haWxJbnZhbGlkKHRleHQpIHtcbiAgICAgICAgY29uc3QgRU1BSUxfUkVHRVggPSAvXlthLXpBLVowLTlfListXStAW2EtekEtWjAtOS1dK1xcLlthLXpBLVowLTktLl0rJC9naTtcbiAgICAgICAgY29uc3QgZW1haWwgPSBWYWxpZGF0b3JzLnRyYWNrRW1haWwodGV4dCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGVtYWlsLm1hdGNoKEVNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbDtcbiAgICB9XG4gICAgdmFsaWRhdGVSZWNpcGllbnRzKCkge1xuICAgICAgICBfLmZvckVhY2godGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCwgKHJlY2lwaWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEZvcm1hdEludmFsaWQocmVjaXBpZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQocmVjaXBpZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVjaXBpZW50TGlzdChyZWNpcGllbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBiYXRjaHMgPSB0aGlzLmF0dHJJblBhcmFtcygnYmF0Y2hzJykgPyB0aGlzLnBhcmFtcy5iYXRjaHMgOiBudWxsO1xuICAgICAgICBjb25zdCB0b3RhbFJlY2lwaWVudHMgPSB0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aDtcbiAgICAgICAgaWYgKGJhdGNocyA9PT0gbnVsbCAmJiB0b3RhbFJlY2lwaWVudHMgPiB0aGlzLnRvdGFsRW1haWxMaW1pdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhdGNoSXNSZXF1aXJlZCh0b3RhbFJlY2lwaWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYWRlRnJvbSgpIHtcbiAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEZvcm1hdEludmFsaWQodGhpcy5wYXJhbXMuZnJvbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRnJvbUZvcm1hdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHRoaXMucGFyYW1zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZyb20oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZVNlbmRBdCgpIHtcbiAgICAgICAgaWYgKF8uaGFzKHRoaXMucGFyYW1zLCAnc2VuZEF0JykgJiYgdGhpcy5wYXJhbXMuc2VuZEF0KSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudCh0aGlzLnBhcmFtcy5zZW5kQXQsIFsnWVlZWS1NTS1ERCBISDptbTpzcyddLCB0cnVlKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlbmRBdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlQXR0YWNobWVudHMoKSB7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzKSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0KCk7XG4gICAgICAgIGxldCB0b3RhbEF0dGFjaG1lbnRzU2l6ZSA9IDA7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5hdHRhY2htZW50cywgKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhdHRhY2htZW50KSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnbmFtZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICdmaWxlJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5maWxlXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5maWxlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRmaWxlID0gYXRvYihhdHRhY2htZW50LmZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IGRmaWxlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmaWxlU2l6ZSA+IHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGZpbGVTaXplIC0gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXM7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaXplTGltaXQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgYXR0YWNobWVudC5uYW1lLCBkaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsQXR0YWNobWVudHNTaXplICs9IGZpbGVTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRvdGFsQXR0YWNobWVudHNTaXplID4gdGhpcy5hdHRhY2hTaXplTGltaXQuYnl0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB0b3RhbEF0dGFjaG1lbnRzU2l6ZSAtIHRoaXMuYXR0YWNoU2l6ZUxpbWl0LmJ5dGVzO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2l6ZUxpbWl0KHRoaXMuYXR0YWNoU2l6ZUxpbWl0Lm1lZ2FieXRlcywgZGlmZik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVCYXRjaHNBcmdzKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2JhdGNocycpIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd0aW1lQmV0d2VlbkJhdGNocycpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2JhdGNocycpKSB0aHJvdyBuZXcgSW52YWxpZEJhdGNoKCk7XG4gICAgICAgICAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wYXJhbXMuYmF0Y2hzKSkgdGhyb3cgbmV3IEludmFsaWRCYXRjaCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCd0aW1lQmV0d2VlbkJhdGNocycpKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgICAgICBpZiAoIV8uaXNOdW1iZXIodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMpKSB0aHJvdyBuZXcgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuYmF0Y2hzIDwgdGhpcy5iYXRjaE1pblNpemUpIHRocm93IG5ldyBCYXRjaExvd2VyVGhhbjIoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy50aW1lQmV0d2VlbkJhdGNocyA8IHRoaXMuYmF0Y2hNaW5UaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBiYXRjaHMgPSBfLmZsb29yKHRoaXMucGFyYW1zLmJhdGNocyk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wVGltZSA9IF8uZmxvb3IodGhpcy5wYXJhbXMudGltZUJldHdlZW5CYXRjaHMpO1xuICAgICAgICAgICAgY29uc3QgdGltZUJldHdlZW5CYXRjaHMgPSB0aGlzLmJhdGNoTWluVGltZSAqIF8uZmxvb3IodGVtcFRpbWUgLyB0aGlzLmJhdGNoTWluVGltZSk7XG5cbiAgICAgICAgICAgIGlmIChiYXRjaHMgPCB0aGlzLmJhdGNoTWluU2l6ZSkgdGhyb3cgbmV3IEludmFsaWRCYXRjaCgpO1xuICAgICAgICAgICAgaWYgKHRpbWVCZXR3ZWVuQmF0Y2hzIDwgdGhpcy5iYXRjaE1pblRpbWUpIHRocm93IG5ldyBJbnZhbGlkVGltZUJldHdlZW1CYXRjaHMoKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmJhdGNocyA9IGJhdGNocztcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnRpbWVCZXR3ZWVuQmF0Y2hzID0gdGltZUJldHdlZW5CYXRjaHM7XG5cbiAgICAgICAgICAgIGxldCBzeXN0ZW1UYWtlT3ZlciA9IG51bGw7XG4gICAgICAgICAgICBsZXQgbGFzdEJhdGNoUGx1c09uZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2hlYWRlcnMnKSkge1xuICAgICAgICAgICAgICAgIGlmIChfLmhhcyh0aGlzLnBhcmFtcy5oZWFkZXJzLCAnc3lzdGVtX3Rha2Vfb3ZlcicpXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMucGFyYW1zLmhlYWRlcnMuc3lzdGVtX3Rha2Vfb3Zlcikge1xuICAgICAgICAgICAgICAgICAgICBzeXN0ZW1UYWtlT3ZlciA9IHRoaXMucGFyYW1zLmhlYWRlcnMuc3lzdGVtX3Rha2Vfb3ZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF8uaGFzKHRoaXMucGFyYW1zLmhlYWRlcnMsICdsYXN0X2JhdGNoX3BsdXNfb25lJylcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wYXJhbXMuaGVhZGVycy5sYXN0X2JhdGNoX3BsdXNfb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RCYXRjaFBsdXNPbmUgPSB0aGlzLnBhcmFtcy5oZWFkZXJzLmxhc3RfYmF0Y2hfcGx1c19vbmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3lzdGVtVGFrZU92ZXIgPT09IG51bGwgJiYgbGFzdEJhdGNoUGx1c09uZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsUmVjaXBpZW50cyA9IHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhdGNoc1NpemUgPSBfLmZsb29yKHRvdGFsUmVjaXBpZW50cyAvIHRoaXMucGFyYW1zLmJhdGNocyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYmF0Y2hzU2l6ZSA+IHRoaXMudG90YWxFbWFpbExpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXRjaFNpemVMaW1pdCh0aGlzLnRvdGFsRW1haWxMaW1pdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoYmF0Y2hzU2l6ZSAqIGJhdGNocykgIT09IHRvdGFsUmVjaXBpZW50cykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmF0Y2hEaXN0cmlidXRpb25JbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGF0dHJOb3RJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiAhXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpIHx8ICF0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG4gICAgYXR0ckluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSAmJiB0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG4gICAgY2hlY2tNYWlsUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdmcm9tJylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd1c2VUcGxEZWZhdWx0RW1haWwnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUmVwbHlFbWFpbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnZnJvbScpKSB0aGlzLnZhbGlkYWRlRnJvbSgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3JlY2lwaWVudExpc3QnKSkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aCkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVCYXRjaHNBcmdzKCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZWNpcGllbnRzKCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVTZW5kQXQoKTtcblxuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N1YmplY3QnKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1N1YmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdE5hbWUnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RlbXBsYXRlU2x1ZycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZU5vRmVhdHVyZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2F0dGFjaG1lbnRzJykpIHRoaXMudmFsaWRhdGVBdHRhY2htZW50cygpO1xuICAgIH1cbiAgICBjaGVja1NlYXJjaFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3RhcnQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdzdGFydCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2VuZCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2VuZCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2FwcElkcycpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2FwcElkcycpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hcHBJZHMpKSB0aHJvdyBuZXcgV3JvbmdUeXBlUGFyYW1YKCdBcnJheScsICdhcHBJZHMnKTtcbiAgICB9XG59XG4iXX0=
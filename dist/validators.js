'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _b2a = require('b2a');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validators = function () {
    function Validators(params) {
        _classCallCheck(this, Validators);

        this.params = params;
        this.attachmentSize = 10; // MB
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
                    dfile = (0, _b2a.atob)(attachment.file);
                } catch (e) {
                    throw new _exceptions.AttachmentFileShouldBeBase64();
                }
                var fileSize = _lodash2.default.divide(dfile.length, 1024 * 1024);
                if (fileSize > _this.attachmentSize) {
                    var diff = fileSize - _this.attachmentSize;
                    throw new _exceptions.AttachmentSizeLimit(_this.attachmentSize, attachment.name, diff);
                }
                totalAttachmentsSize += fileSize;
            });
            if (totalAttachmentsSize > this.attachmentSize) {
                var diff = totalAttachmentsSize - this.attachmentSize;
                throw new _exceptions.AttachmentsSizeLimit(this.attachmentSize, diff);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJhdHRhY2htZW50U2l6ZSIsImZvckVhY2giLCJyZWNpcGllbnRMaXN0IiwicmVjaXBpZW50IiwiaXNFbWFpbEludmFsaWQiLCJmcm9tIiwiaGFzIiwic2VuZEF0IiwiaXNWYWxpZCIsImlzQXJyYXkiLCJhdHRhY2htZW50cyIsInRvdGFsQXR0YWNobWVudHNTaXplIiwiYXR0YWNobWVudCIsImlzT2JqZWN0IiwibmFtZSIsImZpbGUiLCJkZmlsZSIsImUiLCJmaWxlU2l6ZSIsImRpdmlkZSIsImxlbmd0aCIsImRpZmYiLCJhdHRyIiwiYXR0ck5vdEluUGFyYW1zIiwiYXR0ckluUGFyYW1zIiwidmFsaWRhZGVGcm9tIiwidmFsaWRhdGVSZWNpcGllbnRzIiwidmFsaWRhdGVTZW5kQXQiLCJ2YWxpZGF0ZUF0dGFjaG1lbnRzIiwiYXBwSWRzIiwidGV4dCIsIlRSQUNLX0VNQUlMX1JFR0VYIiwidHJhY2tlZCIsIm1hdGNoIiwiRU1BSUxfUkVHRVgiLCJlbWFpbCIsInRyYWNrRW1haWwiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFvQnFCQSxVO0FBQ2pCLHdCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGFBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLGNBQUwsR0FBc0IsRUFBdEIsQ0FGZ0IsQ0FFVztBQUM5Qjs7Ozs2Q0Fhb0I7QUFDakIsNkJBQUVDLE9BQUYsQ0FBVSxLQUFLRixNQUFMLENBQVlHLGFBQXRCLEVBQXFDLFVBQUNDLFNBQUQsRUFBZTtBQUNoRCxvQkFBSUwsV0FBV00sY0FBWCxDQUEwQkQsU0FBMUIsQ0FBSixFQUEwQztBQUN0QywwQkFBTSxzQ0FBTjtBQUNIO0FBQ0osYUFKRDtBQUtIOzs7dUNBQ2M7QUFDWCxnQkFBSUwsV0FBV00sY0FBWCxDQUEwQixLQUFLTCxNQUFMLENBQVlNLElBQXRDLENBQUosRUFBaUQ7QUFDN0Msc0JBQU0sNkJBQU47QUFDSDtBQUNKOzs7eUNBQ2dCO0FBQ2IsZ0JBQUksaUJBQUVDLEdBQUYsQ0FBTSxLQUFLUCxNQUFYLEVBQW1CLFFBQW5CLEtBQWdDLEtBQUtBLE1BQUwsQ0FBWVEsTUFBaEQsRUFBd0Q7QUFDcEQsb0JBQUksQ0FBQyxzQkFBTyxLQUFLUixNQUFMLENBQVlRLE1BQW5CLEVBQTJCLENBQUMscUJBQUQsQ0FBM0IsRUFBb0QsSUFBcEQsRUFBMERDLE9BQTFELEVBQUwsRUFBMEU7QUFDdEUsMEJBQU0sK0JBQU47QUFDSDtBQUNKO0FBQ0o7Ozs4Q0FDcUI7QUFBQTs7QUFDbEIsZ0JBQUksQ0FBQyxpQkFBRUMsT0FBRixDQUFVLEtBQUtWLE1BQUwsQ0FBWVcsV0FBdEIsQ0FBTCxFQUF5QyxNQUFNLHlDQUFOO0FBQ3pDLGdCQUFJQyx1QkFBdUIsQ0FBM0I7QUFDQSw2QkFBRVYsT0FBRixDQUFVLEtBQUtGLE1BQUwsQ0FBWVcsV0FBdEIsRUFBbUMsVUFBQ0UsVUFBRCxFQUFnQjtBQUMvQyxvQkFBSSxDQUFDLGlCQUFFQyxRQUFGLENBQVdELFVBQVgsQ0FBTCxFQUE2QixNQUFNLDBDQUFOO0FBQzdCLG9CQUFJLENBQUMsaUJBQUVOLEdBQUYsQ0FBTU0sVUFBTixFQUFrQixNQUFsQixDQUFELElBQ0csQ0FBQ0EsV0FBV0UsSUFEZixJQUVHRixXQUFXRSxJQUFYLEtBQW9CLEVBRjNCLEVBRStCO0FBQzNCLDBCQUFNLDBDQUFOO0FBQ0g7QUFDRCxvQkFBSSxDQUFDLGlCQUFFUixHQUFGLENBQU1NLFVBQU4sRUFBa0IsTUFBbEIsQ0FBRCxJQUNHLENBQUNBLFdBQVdHLElBRGYsSUFFR0gsV0FBV0csSUFBWCxLQUFvQixFQUYzQixFQUUrQjtBQUMzQiwwQkFBTSwwQ0FBTjtBQUNIO0FBQ0Qsb0JBQUlDLFFBQVEsSUFBWjtBQUNBLG9CQUFJO0FBQ0FBLDRCQUFRLGVBQUtKLFdBQVdHLElBQWhCLENBQVI7QUFDSCxpQkFGRCxDQUVFLE9BQU9FLENBQVAsRUFBVTtBQUNSLDBCQUFNLDhDQUFOO0FBQ0g7QUFDRCxvQkFBTUMsV0FBVyxpQkFBRUMsTUFBRixDQUFTSCxNQUFNSSxNQUFmLEVBQXdCLE9BQU8sSUFBL0IsQ0FBakI7QUFDQSxvQkFBSUYsV0FBVyxNQUFLbEIsY0FBcEIsRUFBb0M7QUFDaEMsd0JBQU1xQixPQUFPSCxXQUFXLE1BQUtsQixjQUE3QjtBQUNBLDBCQUFNLG9DQUF3QixNQUFLQSxjQUE3QixFQUE2Q1ksV0FBV0UsSUFBeEQsRUFBOERPLElBQTlELENBQU47QUFDSDtBQUNEVix3Q0FBd0JPLFFBQXhCO0FBQ0gsYUF4QkQ7QUF5QkEsZ0JBQUlQLHVCQUF1QixLQUFLWCxjQUFoQyxFQUFnRDtBQUM1QyxvQkFBTXFCLE9BQU9WLHVCQUF1QixLQUFLWCxjQUF6QztBQUNBLHNCQUFNLHFDQUF5QixLQUFLQSxjQUE5QixFQUE4Q3FCLElBQTlDLENBQU47QUFDSDtBQUNKOzs7d0NBQ2VDLEksRUFBTTtBQUNsQixtQkFBTyxDQUFDLGlCQUFFaEIsR0FBRixDQUFNLEtBQUtQLE1BQVgsRUFBbUJ1QixJQUFuQixDQUFELElBQTZCLENBQUMsS0FBS3ZCLE1BQUwsQ0FBWXVCLElBQVosQ0FBckM7QUFDSDs7O3FDQUNZQSxJLEVBQU07QUFDZixtQkFBTyxpQkFBRWhCLEdBQUYsQ0FBTSxLQUFLUCxNQUFYLEVBQW1CdUIsSUFBbkIsS0FBNEIsS0FBS3ZCLE1BQUwsQ0FBWXVCLElBQVosQ0FBbkM7QUFDSDs7OzBDQUNpQjtBQUNkLGdCQUFJLENBQUMsaUJBQUVULFFBQUYsQ0FBVyxLQUFLZCxNQUFoQixDQUFMLEVBQThCLE1BQU0sc0NBQU47QUFDOUIsZ0JBQUksS0FBS3dCLGVBQUwsQ0FBcUIsTUFBckIsS0FDRyxLQUFLQSxlQUFMLENBQXFCLG9CQUFyQixDQURQLEVBQ21EO0FBQy9DLHNCQUFNLDhCQUFOO0FBQ0g7QUFDRCxnQkFBSSxLQUFLQyxZQUFMLENBQWtCLE1BQWxCLENBQUosRUFBK0IsS0FBS0MsWUFBTDtBQUMvQixnQkFBSSxLQUFLRixlQUFMLENBQXFCLGVBQXJCLENBQUosRUFBMkMsTUFBTSw2QkFBTjtBQUMzQyxnQkFBSSxDQUFDLGlCQUFFZCxPQUFGLENBQVUsS0FBS1YsTUFBTCxDQUFZRyxhQUF0QixDQUFMLEVBQTJDLE1BQU0sNkJBQU47QUFDM0MsZ0JBQUksQ0FBQyxLQUFLSCxNQUFMLENBQVlHLGFBQVosQ0FBMEJrQixNQUEvQixFQUF1QyxNQUFNLDZCQUFOO0FBQ3ZDLGlCQUFLTSxrQkFBTDtBQUNBLGlCQUFLQyxjQUFMOztBQUVBLGdCQUFJLEtBQUtKLGVBQUwsQ0FBcUIsU0FBckIsS0FDRyxLQUFLQSxlQUFMLENBQXFCLHNCQUFyQixDQURQLEVBQ3FEO0FBQ2pELHNCQUFNLDJCQUFOO0FBQ0g7QUFDRCxnQkFBSSxDQUFDLEtBQUtDLFlBQUwsQ0FBa0Isc0JBQWxCLEtBQ0UsS0FBS0EsWUFBTCxDQUFrQixtQkFBbEIsQ0FERixJQUVFLEtBQUtBLFlBQUwsQ0FBa0Isb0JBQWxCLENBRkgsS0FHRyxLQUFLRCxlQUFMLENBQXFCLGNBQXJCLENBSFAsRUFHNkM7QUFDekMsc0JBQU0sc0NBQU47QUFDSDtBQUNELGdCQUFJLEtBQUtDLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBSixFQUFzQyxLQUFLSSxtQkFBTDtBQUN6Qzs7OzRDQUNtQjtBQUNoQixnQkFBSSxDQUFDLGlCQUFFZixRQUFGLENBQVcsS0FBS2QsTUFBaEIsQ0FBTCxFQUE4QixNQUFNLHNDQUFOO0FBQzlCLGdCQUFJLEtBQUt3QixlQUFMLENBQXFCLE9BQXJCLENBQUosRUFBbUMsTUFBTSx5QkFBYSxPQUFiLENBQU47QUFDbkMsZ0JBQUksS0FBS0EsZUFBTCxDQUFxQixLQUFyQixDQUFKLEVBQWlDLE1BQU0seUJBQWEsS0FBYixDQUFOO0FBQ2pDLGdCQUFJLEtBQUtBLGVBQUwsQ0FBcUIsUUFBckIsQ0FBSixFQUFvQyxNQUFNLHlCQUFhLFFBQWIsQ0FBTjtBQUNwQyxnQkFBSSxDQUFDLGlCQUFFZCxPQUFGLENBQVUsS0FBS1YsTUFBTCxDQUFZOEIsTUFBdEIsQ0FBTCxFQUFvQyxNQUFNLGdDQUFvQixPQUFwQixFQUE2QixRQUE3QixDQUFOO0FBQ3ZDOzs7bUNBckdpQkMsSSxFQUFNO0FBQ3BCLGdCQUFNQyxvQkFBb0Isc0RBQTFCO0FBQ0EsZ0JBQU1DLFVBQVVGLEtBQUtHLEtBQUwsQ0FBV0YsaUJBQVgsQ0FBaEI7QUFDQSxtQkFBT0MsVUFBVUEsUUFBUSxDQUFSLENBQVYsR0FBdUIsSUFBOUI7QUFDSDs7O3VDQUNxQkYsSSxFQUFNO0FBQ3hCLGdCQUFNSSxjQUFjLDBFQUFwQjtBQUNBLGdCQUFNQyxRQUFRckMsV0FBV3NDLFVBQVgsQ0FBc0JOLElBQXRCLENBQWQ7QUFDQSxnQkFBSSxDQUFDSyxLQUFMLEVBQVksT0FBTyxJQUFQO0FBQ1osZ0JBQU1FLFNBQVNGLE1BQU1GLEtBQU4sQ0FBWUMsV0FBWixDQUFmO0FBQ0EsbUJBQU9HLFdBQVcsSUFBbEI7QUFDSDs7Ozs7O2tCQWhCZ0J2QyxVIiwiZmlsZSI6InZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYXRvYiB9IGZyb20gJ2IyYSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1xuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb1JlY2lwaWVudCxcbiAgICBJbnZhbGlkRnJvbSxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgSW52YWxpZFNlbmRBdCxcbiAgICBXcm9uZ1R5cGVQYXJhbVgsXG4gICAgQXR0YWNobWVudFNpemVMaW1pdCxcbiAgICBBdHRhY2htZW50c1NpemVMaW1pdCxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbiAgICBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCxcbiAgICBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lLFxuICAgIEF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSxcbiAgICBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0LFxufSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0b3JzIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuYXR0YWNobWVudFNpemUgPSAxMDsgIC8vIE1CXG4gICAgfVxuICAgIHN0YXRpYyB0cmFja0VtYWlsKHRleHQpIHtcbiAgICAgICAgY29uc3QgVFJBQ0tfRU1BSUxfUkVHRVggPSAvKFthLXpBLVowLTkuXy1dK0BbYS16QS1aMC05Ll8tXStcXC5bYS16QS1aMC05Ll8tXSspL2dpO1xuICAgICAgICBjb25zdCB0cmFja2VkID0gdGV4dC5tYXRjaChUUkFDS19FTUFJTF9SRUdFWCk7XG4gICAgICAgIHJldHVybiB0cmFja2VkID8gdHJhY2tlZFswXSA6IG51bGw7XG4gICAgfVxuICAgIHN0YXRpYyBpc0VtYWlsSW52YWxpZCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IEVNQUlMX1JFR0VYID0gLyheW2EtekEtWjAtOS4hIyQlJuKAmSorLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05LV0rKD86XFwuW2EtekEtWjAtOS1dKykqJCkvZ2k7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gVmFsaWRhdG9ycy50cmFja0VtYWlsKHRleHQpO1xuICAgICAgICBpZiAoIWVtYWlsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZW1haWwubWF0Y2goRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID09PSBudWxsO1xuICAgIH1cbiAgICB2YWxpZGF0ZVJlY2lwaWVudHMoKSB7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0LCAocmVjaXBpZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZChyZWNpcGllbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNpcGllbnRMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWxpZGFkZUZyb20oKSB7XG4gICAgICAgIGlmIChWYWxpZGF0b3JzLmlzRW1haWxJbnZhbGlkKHRoaXMucGFyYW1zLmZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZyb20oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZVNlbmRBdCgpIHtcbiAgICAgICAgaWYgKF8uaGFzKHRoaXMucGFyYW1zLCAnc2VuZEF0JykgJiYgdGhpcy5wYXJhbXMuc2VuZEF0KSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudCh0aGlzLnBhcmFtcy5zZW5kQXQsIFsnWVlZWS1NTS1ERCBISDptbTpzcyddLCB0cnVlKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlbmRBdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlQXR0YWNobWVudHMoKSB7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLmF0dGFjaG1lbnRzKSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0KCk7XG4gICAgICAgIGxldCB0b3RhbEF0dGFjaG1lbnRzU2l6ZSA9IDA7XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLnBhcmFtcy5hdHRhY2htZW50cywgKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhdHRhY2htZW50KSkgdGhyb3cgbmV3IEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhhdHRhY2htZW50LCAnbmFtZScpXG4gICAgICAgICAgICAgICAgfHwgIWF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgICAgIHx8IGF0dGFjaG1lbnQubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV8uaGFzKGF0dGFjaG1lbnQsICdmaWxlJylcbiAgICAgICAgICAgICAgICB8fCAhYXR0YWNobWVudC5maWxlXG4gICAgICAgICAgICAgICAgfHwgYXR0YWNobWVudC5maWxlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZmlsZSA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRmaWxlID0gYXRvYihhdHRhY2htZW50LmZpbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IF8uZGl2aWRlKGRmaWxlLmxlbmd0aCwgKDEwMjQgKiAxMDI0KSk7XG4gICAgICAgICAgICBpZiAoZmlsZVNpemUgPiB0aGlzLmF0dGFjaG1lbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGZpbGVTaXplIC0gdGhpcy5hdHRhY2htZW50U2l6ZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXR0YWNobWVudFNpemVMaW1pdCh0aGlzLmF0dGFjaG1lbnRTaXplLCBhdHRhY2htZW50Lm5hbWUsIGRpZmYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxBdHRhY2htZW50c1NpemUgKz0gZmlsZVNpemU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodG90YWxBdHRhY2htZW50c1NpemUgPiB0aGlzLmF0dGFjaG1lbnRTaXplKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gdG90YWxBdHRhY2htZW50c1NpemUgLSB0aGlzLmF0dGFjaG1lbnRTaXplO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF0dGFjaG1lbnRzU2l6ZUxpbWl0KHRoaXMuYXR0YWNobWVudFNpemUsIGRpZmYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGF0dHJOb3RJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiAhXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpIHx8ICF0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG4gICAgYXR0ckluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSAmJiB0aGlzLnBhcmFtc1thdHRyXTtcbiAgICB9XG4gICAgY2hlY2tNYWlsUGFyYW1zKCkge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3QodGhpcy5wYXJhbXMpKSB0aHJvdyBuZXcgUGFyYW1zU2hvdWxkQmVPYmplY3QoKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdmcm9tJylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd1c2VUcGxEZWZhdWx0RW1haWwnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUmVwbHlFbWFpbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJJblBhcmFtcygnZnJvbScpKSB0aGlzLnZhbGlkYWRlRnJvbSgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3JlY2lwaWVudExpc3QnKSkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0Lmxlbmd0aCkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZWNpcGllbnRzKCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVTZW5kQXQoKTtcblxuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N1YmplY3QnKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1N1YmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdE5hbWUnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RlbXBsYXRlU2x1ZycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZU5vRmVhdHVyZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2F0dGFjaG1lbnRzJykpIHRoaXMudmFsaWRhdGVBdHRhY2htZW50cygpO1xuICAgIH1cbiAgICBjaGVja1NlYXJjaFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3RhcnQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdzdGFydCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2VuZCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2VuZCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2FwcElkcycpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2FwcElkcycpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hcHBJZHMpKSB0aHJvdyBuZXcgV3JvbmdUeXBlUGFyYW1YKCdBcnJheScsICdhcHBJZHMnKTtcbiAgICB9XG59XG4iXX0=
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _apysignature = require('apysignature');

var _apysignature2 = _interopRequireDefault(_apysignature);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apis = {
    text: '/api/send_mail/',
    template: '/api/send_mail/template/',
    search: '/api/mail/search/',
    specifics: '/api/mail/search/specifics/'
};

function getUrl(options) {
    var sendMethod = apis[options.endpoint];
    var signedReq = new _apysignature2.default.Request(options.method, sendMethod, {});
    var token = new _apysignature2.default.Token(options.apiKey, options.apiSecret);
    token.sign(signedReq);
    var authDict = signedReq.getAuthDict();
    return '' + options.serverUri + sendMethod + '?' + _querystring2.default.stringify(authDict);
}

var Api = function () {
    function Api(key, secret, returnRawError, serverUri, timeoutRead) {
        _classCallCheck(this, Api);

        if (!key || typeof key !== 'string') {
            throw new _exceptions.NoPublicKey();
        }
        if (!secret || typeof secret !== 'string') {
            throw new _exceptions.NoSecretKey();
        }
        if (serverUri) {
            if (typeof serverUri !== 'string') {
                throw new _exceptions.InvalidServerUri();
            }
        }
        this.apiKey = key;
        this.apiSecret = secret;
        this.returnRawError = returnRawError || false;
        this.serverUri = serverUri || 'http://postman.alterdata.com.br';
        this.timeout = (timeoutRead > 0 ? timeoutRead : 1) * 1000;
    }

    _createClass(Api, [{
        key: 'sendRequest',
        value: function sendRequest(payload, endpoint, method, headers) {
            var _this = this;

            var httpMethod = method ? method.toLowerCase() : 'post';
            var url = getUrl({
                apiKey: this.apiKey,
                apiSecret: this.apiSecret,
                serverUri: this.serverUri,
                method: httpMethod,
                endpoint: endpoint
            });
            var options = {
                url: url,
                method: httpMethod.toUpperCase(),
                headers: headers || {},
                timeout: this.timeout
            };
            if (httpMethod === 'get') {
                options.qs = payload;
            } else {
                options.json = payload;
            }
            return new Promise(function (f, reject) {
                (0, _request2.default)(options, function (error, response, body) {
                    if (!error && [200, 201].indexOf(response.statusCode) > -1) {
                        f(body);
                    } else {
                        var err = error;
                        if (!err) {
                            err = { Error: _lodash2.default.isString(body) ? body : body.error };
                        }
                        if (_this.returnRawError) {
                            reject({ error: error, body: body });
                        } else {
                            reject(err);
                        }
                    }
                });
            });
        }
    }]);

    return Api;
}();

exports.default = Api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyIiwiRXJyb3IiLCJpc1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPO0FBQ1RDLFVBQU0saUJBREc7QUFFVEMsY0FBVSwwQkFGRDtBQUdUQyxZQUFRLG1CQUhDO0FBSVRDLGVBQVc7QUFKRixDQUFiOztBQU9BLFNBQVNDLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCO0FBQ3JCLFFBQU1DLGFBQWFQLEtBQUtNLFFBQVFFLFFBQWIsQ0FBbkI7QUFDQSxRQUFNQyxZQUFZLElBQUksdUJBQVVDLE9BQWQsQ0FBc0JKLFFBQVFLLE1BQTlCLEVBQXNDSixVQUF0QyxFQUFrRCxFQUFsRCxDQUFsQjtBQUNBLFFBQU1LLFFBQVEsSUFBSSx1QkFBVUMsS0FBZCxDQUFvQlAsUUFBUVEsTUFBNUIsRUFBb0NSLFFBQVFTLFNBQTVDLENBQWQ7QUFDQUgsVUFBTUksSUFBTixDQUFXUCxTQUFYO0FBQ0EsUUFBTVEsV0FBV1IsVUFBVVMsV0FBVixFQUFqQjtBQUNBLGdCQUFVWixRQUFRYSxTQUFsQixHQUE4QlosVUFBOUIsU0FBNEMsc0JBQVlhLFNBQVosQ0FBc0JILFFBQXRCLENBQTVDO0FBQ0g7O0lBRW9CSSxHO0FBQ2pCLGlCQUFZQyxHQUFaLEVBQWlCQyxNQUFqQixFQUF5QkMsY0FBekIsRUFBeUNMLFNBQXpDLEVBQW9ETSxXQUFwRCxFQUFpRTtBQUFBOztBQUM3RCxZQUFJLENBQUNILEdBQUQsSUFBUSxPQUFPQSxHQUFQLEtBQWUsUUFBM0IsRUFBcUM7QUFDakMsa0JBQU0sNkJBQU47QUFDSDtBQUNELFlBQUksQ0FBQ0MsTUFBRCxJQUFXLE9BQU9BLE1BQVAsS0FBa0IsUUFBakMsRUFBMkM7QUFDdkMsa0JBQU0sNkJBQU47QUFDSDtBQUNELFlBQUlKLFNBQUosRUFBZTtBQUNYLGdCQUFJLE9BQU9BLFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDL0Isc0JBQU0sa0NBQU47QUFDSDtBQUNKO0FBQ0QsYUFBS0wsTUFBTCxHQUFjUSxHQUFkO0FBQ0EsYUFBS1AsU0FBTCxHQUFpQlEsTUFBakI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCQSxrQkFBa0IsS0FBeEM7QUFDQSxhQUFLTCxTQUFMLEdBQWlCQSxhQUFhLGlDQUE5QjtBQUNBLGFBQUtPLE9BQUwsR0FBZSxDQUFDRCxjQUFjLENBQWQsR0FBa0JBLFdBQWxCLEdBQWdDLENBQWpDLElBQXNDLElBQXJEO0FBQ0g7Ozs7b0NBQ1dFLE8sRUFBU25CLFEsRUFBVUcsTSxFQUFRaUIsTyxFQUFTO0FBQUE7O0FBQzVDLGdCQUFNQyxhQUFhbEIsU0FBU0EsT0FBT21CLFdBQVAsRUFBVCxHQUFnQyxNQUFuRDtBQUNBLGdCQUFNQyxNQUFNMUIsT0FBTztBQUNmUyx3QkFBUSxLQUFLQSxNQURFO0FBRWZDLDJCQUFXLEtBQUtBLFNBRkQ7QUFHZkksMkJBQVcsS0FBS0EsU0FIRDtBQUlmUix3QkFBUWtCLFVBSk87QUFLZnJCO0FBTGUsYUFBUCxDQUFaO0FBT0EsZ0JBQU1GLFVBQVU7QUFDWnlCLHdCQURZO0FBRVpwQix3QkFBUWtCLFdBQVdHLFdBQVgsRUFGSTtBQUdaSix5QkFBU0EsV0FBVyxFQUhSO0FBSVpGLHlCQUFTLEtBQUtBO0FBSkYsYUFBaEI7QUFNQSxnQkFBSUcsZUFBZSxLQUFuQixFQUEwQjtBQUN0QnZCLHdCQUFRMkIsRUFBUixHQUFhTixPQUFiO0FBQ0gsYUFGRCxNQUVPO0FBQ0hyQix3QkFBUTRCLElBQVIsR0FBZVAsT0FBZjtBQUNIO0FBQ0QsbUJBQU8sSUFBSVEsT0FBSixDQUFZLFVBQUNDLENBQUQsRUFBSUMsTUFBSixFQUFlO0FBQzlCLHVDQUFRL0IsT0FBUixFQUFpQixVQUFDZ0MsS0FBRCxFQUFRQyxRQUFSLEVBQWtCQyxJQUFsQixFQUEyQjtBQUN4Qyx3QkFBSSxDQUFDRixLQUFELElBQVUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXRyxPQUFYLENBQW1CRixTQUFTRyxVQUE1QixJQUEwQyxDQUFDLENBQXpELEVBQTREO0FBQ3hETiwwQkFBRUksSUFBRjtBQUNILHFCQUZELE1BRU87QUFDSCw0QkFBSUcsTUFBTUwsS0FBVjtBQUNBLDRCQUFJLENBQUNLLEdBQUwsRUFBVTtBQUNOQSxrQ0FBTSxFQUFFQyxPQUFPLGlCQUFFQyxRQUFGLENBQVdMLElBQVgsSUFBbUJBLElBQW5CLEdBQTBCQSxLQUFLRixLQUF4QyxFQUFOO0FBQ0g7QUFDRCw0QkFBSSxNQUFLZCxjQUFULEVBQXlCO0FBQ3JCYSxtQ0FBTyxFQUFFQyxZQUFGLEVBQVNFLFVBQVQsRUFBUDtBQUNILHlCQUZELE1BRU87QUFDSEgsbUNBQU9NLEdBQVA7QUFDSDtBQUNKO0FBQ0osaUJBZEQ7QUFlSCxhQWhCTSxDQUFQO0FBaUJIOzs7Ozs7a0JBeERnQnRCLEciLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0IHNpZ25hdHVyZSBmcm9tICdhcHlzaWduYXR1cmUnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB7IE5vUHVibGljS2V5LCBOb1NlY3JldEtleSwgSW52YWxpZFNlcnZlclVyaSB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmNvbnN0IGFwaXMgPSB7XG4gICAgdGV4dDogJy9hcGkvc2VuZF9tYWlsLycsXG4gICAgdGVtcGxhdGU6ICcvYXBpL3NlbmRfbWFpbC90ZW1wbGF0ZS8nLFxuICAgIHNlYXJjaDogJy9hcGkvbWFpbC9zZWFyY2gvJyxcbiAgICBzcGVjaWZpY3M6ICcvYXBpL21haWwvc2VhcmNoL3NwZWNpZmljcy8nLFxufTtcblxuZnVuY3Rpb24gZ2V0VXJsKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzZW5kTWV0aG9kID0gYXBpc1tvcHRpb25zLmVuZHBvaW50XTtcbiAgICBjb25zdCBzaWduZWRSZXEgPSBuZXcgc2lnbmF0dXJlLlJlcXVlc3Qob3B0aW9ucy5tZXRob2QsIHNlbmRNZXRob2QsIHt9KTtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBzaWduYXR1cmUuVG9rZW4ob3B0aW9ucy5hcGlLZXksIG9wdGlvbnMuYXBpU2VjcmV0KTtcbiAgICB0b2tlbi5zaWduKHNpZ25lZFJlcSk7XG4gICAgY29uc3QgYXV0aERpY3QgPSBzaWduZWRSZXEuZ2V0QXV0aERpY3QoKTtcbiAgICByZXR1cm4gYCR7b3B0aW9ucy5zZXJ2ZXJVcml9JHtzZW5kTWV0aG9kfT8ke3F1ZXJ5c3RyaW5nLnN0cmluZ2lmeShhdXRoRGljdCl9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIHNlY3JldCwgcmV0dXJuUmF3RXJyb3IsIHNlcnZlclVyaSwgdGltZW91dFJlYWQpIHtcbiAgICAgICAgaWYgKCFrZXkgfHwgdHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1B1YmxpY0tleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VjcmV0IHx8IHR5cGVvZiBzZWNyZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9TZWNyZXRLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmVyVXJpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlcnZlclVyaSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlcnZlclVyaSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBpS2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmFwaVNlY3JldCA9IHNlY3JldDtcbiAgICAgICAgdGhpcy5yZXR1cm5SYXdFcnJvciA9IHJldHVyblJhd0Vycm9yIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnNlcnZlclVyaSA9IHNlcnZlclVyaSB8fCAnaHR0cDovL3Bvc3RtYW4uYWx0ZXJkYXRhLmNvbS5icic7XG4gICAgICAgIHRoaXMudGltZW91dCA9ICh0aW1lb3V0UmVhZCA+IDAgPyB0aW1lb3V0UmVhZCA6IDEpICogMTAwMDtcbiAgICB9XG4gICAgc2VuZFJlcXVlc3QocGF5bG9hZCwgZW5kcG9pbnQsIG1ldGhvZCwgaGVhZGVycykge1xuICAgICAgICBjb25zdCBodHRwTWV0aG9kID0gbWV0aG9kID8gbWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAncG9zdCc7XG4gICAgICAgIGNvbnN0IHVybCA9IGdldFVybCh7XG4gICAgICAgICAgICBhcGlLZXk6IHRoaXMuYXBpS2V5LFxuICAgICAgICAgICAgYXBpU2VjcmV0OiB0aGlzLmFwaVNlY3JldCxcbiAgICAgICAgICAgIHNlcnZlclVyaTogdGhpcy5zZXJ2ZXJVcmksXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QsXG4gICAgICAgICAgICBlbmRwb2ludCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgfHwge30sXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChodHRwTWV0aG9kID09PSAnZ2V0Jykge1xuICAgICAgICAgICAgb3B0aW9ucy5xcyA9IHBheWxvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLmpzb24gPSBwYXlsb2FkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZiwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0KG9wdGlvbnMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yICYmIFsyMDAsIDIwMV0uaW5kZXhPZihyZXNwb25zZS5zdGF0dXNDb2RlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGYoYm9keSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0geyBFcnJvcjogXy5pc1N0cmluZyhib2R5KSA/IGJvZHkgOiBib2R5LmVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7IGVycm9yLCBib2R5IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
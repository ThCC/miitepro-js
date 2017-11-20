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
    function Api(key, secret, returnRawError, serverUri) {
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
    }

    _createClass(Api, [{
        key: 'sendRequest',
        value: function sendRequest(payload, endpoint, method, headers, timeout) {
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
                timeout: timeout || 25 * 1000
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJwYXlsb2FkIiwiaGVhZGVycyIsInRpbWVvdXQiLCJodHRwTWV0aG9kIiwidG9Mb3dlckNhc2UiLCJ1cmwiLCJ0b1VwcGVyQ2FzZSIsInFzIiwianNvbiIsIlByb21pc2UiLCJmIiwicmVqZWN0IiwiZXJyb3IiLCJyZXNwb25zZSIsImJvZHkiLCJpbmRleE9mIiwic3RhdHVzQ29kZSIsImVyciIsIkVycm9yIiwiaXNTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTztBQUNUQyxVQUFNLGlCQURHO0FBRVRDLGNBQVUsMEJBRkQ7QUFHVEMsWUFBUSxtQkFIQztBQUlUQyxlQUFXO0FBSkYsQ0FBYjs7QUFPQSxTQUFTQyxNQUFULENBQWdCQyxPQUFoQixFQUF5QjtBQUNyQixRQUFNQyxhQUFhUCxLQUFLTSxRQUFRRSxRQUFiLENBQW5CO0FBQ0EsUUFBTUMsWUFBWSxJQUFJLHVCQUFVQyxPQUFkLENBQXNCSixRQUFRSyxNQUE5QixFQUFzQ0osVUFBdEMsRUFBa0QsRUFBbEQsQ0FBbEI7QUFDQSxRQUFNSyxRQUFRLElBQUksdUJBQVVDLEtBQWQsQ0FBb0JQLFFBQVFRLE1BQTVCLEVBQW9DUixRQUFRUyxTQUE1QyxDQUFkO0FBQ0FILFVBQU1JLElBQU4sQ0FBV1AsU0FBWDtBQUNBLFFBQU1RLFdBQVdSLFVBQVVTLFdBQVYsRUFBakI7QUFDQSxnQkFBVVosUUFBUWEsU0FBbEIsR0FBOEJaLFVBQTlCLFNBQTRDLHNCQUFZYSxTQUFaLENBQXNCSCxRQUF0QixDQUE1QztBQUNIOztJQUVvQkksRztBQUNqQixpQkFBWUMsR0FBWixFQUFpQkMsTUFBakIsRUFBeUJDLGNBQXpCLEVBQXlDTCxTQUF6QyxFQUFvRDtBQUFBOztBQUNoRCxZQUFJLENBQUNHLEdBQUQsSUFBUSxPQUFPQSxHQUFQLEtBQWUsUUFBM0IsRUFBcUM7QUFDakMsa0JBQU0sNkJBQU47QUFDSDtBQUNELFlBQUksQ0FBQ0MsTUFBRCxJQUFXLE9BQU9BLE1BQVAsS0FBa0IsUUFBakMsRUFBMkM7QUFDdkMsa0JBQU0sNkJBQU47QUFDSDtBQUNELFlBQUlKLFNBQUosRUFBZTtBQUNYLGdCQUFJLE9BQU9BLFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDL0Isc0JBQU0sa0NBQU47QUFDSDtBQUNKO0FBQ0QsYUFBS0wsTUFBTCxHQUFjUSxHQUFkO0FBQ0EsYUFBS1AsU0FBTCxHQUFpQlEsTUFBakI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCQSxrQkFBa0IsS0FBeEM7QUFDQSxhQUFLTCxTQUFMLEdBQWlCQSxhQUFhLGlDQUE5QjtBQUNIOzs7O29DQUNXTSxPLEVBQVNqQixRLEVBQVVHLE0sRUFBUWUsTyxFQUFTQyxPLEVBQVM7QUFBQTs7QUFDckQsZ0JBQU1DLGFBQWFqQixTQUFTQSxPQUFPa0IsV0FBUCxFQUFULEdBQWdDLE1BQW5EO0FBQ0EsZ0JBQU1DLE1BQU16QixPQUFPO0FBQ2ZTLHdCQUFRLEtBQUtBLE1BREU7QUFFZkMsMkJBQVcsS0FBS0EsU0FGRDtBQUdmSSwyQkFBVyxLQUFLQSxTQUhEO0FBSWZSLHdCQUFRaUIsVUFKTztBQUtmcEI7QUFMZSxhQUFQLENBQVo7QUFPQSxnQkFBTUYsVUFBVTtBQUNad0Isd0JBRFk7QUFFWm5CLHdCQUFRaUIsV0FBV0csV0FBWCxFQUZJO0FBR1pMLHlCQUFTQSxXQUFXLEVBSFI7QUFJWkMseUJBQVNBLFdBQVcsS0FBSztBQUpiLGFBQWhCO0FBTUEsZ0JBQUlDLGVBQWUsS0FBbkIsRUFBMEI7QUFDdEJ0Qix3QkFBUTBCLEVBQVIsR0FBYVAsT0FBYjtBQUNILGFBRkQsTUFFTztBQUNIbkIsd0JBQVEyQixJQUFSLEdBQWVSLE9BQWY7QUFDSDtBQUNELG1CQUFPLElBQUlTLE9BQUosQ0FBWSxVQUFDQyxDQUFELEVBQUlDLE1BQUosRUFBZTtBQUM5Qix1Q0FBUTlCLE9BQVIsRUFBaUIsVUFBQytCLEtBQUQsRUFBUUMsUUFBUixFQUFrQkMsSUFBbEIsRUFBMkI7QUFDeEMsd0JBQUksQ0FBQ0YsS0FBRCxJQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBV0csT0FBWCxDQUFtQkYsU0FBU0csVUFBNUIsSUFBMEMsQ0FBQyxDQUF6RCxFQUE0RDtBQUN4RE4sMEJBQUVJLElBQUY7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNEJBQUlHLE1BQU1MLEtBQVY7QUFDQSw0QkFBSSxDQUFDSyxHQUFMLEVBQVU7QUFDTkEsa0NBQU0sRUFBRUMsT0FBTyxpQkFBRUMsUUFBRixDQUFXTCxJQUFYLElBQW1CQSxJQUFuQixHQUEwQkEsS0FBS0YsS0FBeEMsRUFBTjtBQUNIO0FBQ0QsNEJBQUksTUFBS2IsY0FBVCxFQUF5QjtBQUNyQlksbUNBQU8sRUFBRUMsWUFBRixFQUFTRSxVQUFULEVBQVA7QUFDSCx5QkFGRCxNQUVPO0FBQ0hILG1DQUFPTSxHQUFQO0FBQ0g7QUFDSjtBQUNKLGlCQWREO0FBZUgsYUFoQk0sQ0FBUDtBQWlCSDs7Ozs7O2tCQXZEZ0JyQixHIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCBzaWduYXR1cmUgZnJvbSAnYXB5c2lnbmF0dXJlJztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgeyBOb1B1YmxpY0tleSwgTm9TZWNyZXRLZXksIEludmFsaWRTZXJ2ZXJVcmkgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5jb25zdCBhcGlzID0ge1xuICAgIHRleHQ6ICcvYXBpL3NlbmRfbWFpbC8nLFxuICAgIHRlbXBsYXRlOiAnL2FwaS9zZW5kX21haWwvdGVtcGxhdGUvJyxcbiAgICBzZWFyY2g6ICcvYXBpL21haWwvc2VhcmNoLycsXG4gICAgc3BlY2lmaWNzOiAnL2FwaS9tYWlsL3NlYXJjaC9zcGVjaWZpY3MvJyxcbn07XG5cbmZ1bmN0aW9uIGdldFVybChvcHRpb25zKSB7XG4gICAgY29uc3Qgc2VuZE1ldGhvZCA9IGFwaXNbb3B0aW9ucy5lbmRwb2ludF07XG4gICAgY29uc3Qgc2lnbmVkUmVxID0gbmV3IHNpZ25hdHVyZS5SZXF1ZXN0KG9wdGlvbnMubWV0aG9kLCBzZW5kTWV0aG9kLCB7fSk7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgc2lnbmF0dXJlLlRva2VuKG9wdGlvbnMuYXBpS2V5LCBvcHRpb25zLmFwaVNlY3JldCk7XG4gICAgdG9rZW4uc2lnbihzaWduZWRSZXEpO1xuICAgIGNvbnN0IGF1dGhEaWN0ID0gc2lnbmVkUmVxLmdldEF1dGhEaWN0KCk7XG4gICAgcmV0dXJuIGAke29wdGlvbnMuc2VydmVyVXJpfSR7c2VuZE1ldGhvZH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkoYXV0aERpY3QpfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBzZWNyZXQsIHJldHVyblJhd0Vycm9yLCBzZXJ2ZXJVcmkpIHtcbiAgICAgICAgaWYgKCFrZXkgfHwgdHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1B1YmxpY0tleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VjcmV0IHx8IHR5cGVvZiBzZWNyZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9TZWNyZXRLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmVyVXJpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlcnZlclVyaSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlcnZlclVyaSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBpS2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmFwaVNlY3JldCA9IHNlY3JldDtcbiAgICAgICAgdGhpcy5yZXR1cm5SYXdFcnJvciA9IHJldHVyblJhd0Vycm9yIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnNlcnZlclVyaSA9IHNlcnZlclVyaSB8fCAnaHR0cDovL3Bvc3RtYW4uYWx0ZXJkYXRhLmNvbS5icic7XG4gICAgfVxuICAgIHNlbmRSZXF1ZXN0KHBheWxvYWQsIGVuZHBvaW50LCBtZXRob2QsIGhlYWRlcnMsIHRpbWVvdXQpIHtcbiAgICAgICAgY29uc3QgaHR0cE1ldGhvZCA9IG1ldGhvZCA/IG1ldGhvZC50b0xvd2VyQ2FzZSgpIDogJ3Bvc3QnO1xuICAgICAgICBjb25zdCB1cmwgPSBnZXRVcmwoe1xuICAgICAgICAgICAgYXBpS2V5OiB0aGlzLmFwaUtleSxcbiAgICAgICAgICAgIGFwaVNlY3JldDogdGhpcy5hcGlTZWNyZXQsXG4gICAgICAgICAgICBzZXJ2ZXJVcmk6IHRoaXMuc2VydmVyVXJpLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLFxuICAgICAgICAgICAgZW5kcG9pbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgdGltZW91dDogdGltZW91dCB8fCAyNSAqIDEwMDAsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChodHRwTWV0aG9kID09PSAnZ2V0Jykge1xuICAgICAgICAgICAgb3B0aW9ucy5xcyA9IHBheWxvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLmpzb24gPSBwYXlsb2FkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZiwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0KG9wdGlvbnMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yICYmIFsyMDAsIDIwMV0uaW5kZXhPZihyZXNwb25zZS5zdGF0dXNDb2RlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGYoYm9keSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0geyBFcnJvcjogXy5pc1N0cmluZyhib2R5KSA/IGJvZHkgOiBib2R5LmVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7IGVycm9yLCBib2R5IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
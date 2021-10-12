'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _createLetter = require('../createLetter.js');

var _createLetter2 = _interopRequireDefault(_createLetter);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var __dirname = _path2.default.resolve();

var port = process.env.PORT || 9001;

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/post_pdf', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var stream;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('Ive been hit');
                        stream = res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Access-Control-Allow-Origin': '*'
                            // 'Content-Disposition': 'attachment; filename=appointmentletter.pdf',
                        });


                        (0, _createLetter2.default)(req.body, function (chunk) {
                            return stream.write(chunk);
                        }, function () {
                            return stream.end();
                        });

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(_express2.default.static(_path2.default.resolve(__dirname, "./client/build")));
app.get("*", function (req, res) {
    _express.response.sendFile(_path2.default.resolve(__dirname, "./client/build", "index.html"));
});

var server = app.listen(port, function () {
    return console.log('Listening on port ' + server.address().port);
});
//# sourceMappingURL=index.js.map
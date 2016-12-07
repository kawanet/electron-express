# electron-express - Electron + Express + WebSocket + msgpack

1. Download the repository:

```sh
git clone --depth=1 https://github.com/kawanet/electron-express.git
cd electron-express
npm install && (cd build && npm install)
npm run
```

2. Run with a traditional Node.js application:

```sh
./server.js --port=3000 &
open http://127.0.0.1:3000/home/
```

3. Run with Electron on the fly:

```sh
./build/node_modules/.bin/electron ./main.js &
```

4. Build as a macOS application:

```sh
./build/node_modules/.bin/electron -v
./build/node_modules/.bin/electron-packager . --overwrite --platform=darwin --arch=x64 \
 --out=build --ignore=tmp/ --ignore=build/ --ignore=test/ --ignore=.idea/ --version=1.4.0
hdiutil create -srcfolder build/electron-express-darwin-x64/ build/electron-express-darwin-x64.dmg
```

5. Prepare for building a Windows application:

```sh
brew cask install xquartz
brew install wine
```

6. Build as a Windows application:

```sh
./build/node_modules/.bin/electron-packager . --overwrite --platform=win32 --arch=x64 \
 --out=build --ignore=tmp/ --ignore=build/ --ignore=test/ --ignore=.idea/ --version=1.4.0
cd build && zip -yDr electron-express-win32-x64.zip electron-express-win32-x64
```

## SEE ALSO

### GitHub

- [https://github.com/kawanet/electron-express](https://github.com/kawanet/electron-express)

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

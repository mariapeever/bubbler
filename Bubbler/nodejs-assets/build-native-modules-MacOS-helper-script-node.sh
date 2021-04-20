#!/bin/bash
      # Helper script for Gradle to call node on macOS in case it is not found
      export PATH=$PATH:/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/kses/Testing/react-native/bubbler/Bubbler/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/kses/Testing/react-native/bubbler/Bubbler/node_modules/.bin:/usr/local/opt/ruby/bin:/usr/local/opt/openssl@1.1/bin:/Library/Frameworks/Python.framework/Versions/3.8/bin:/Library/Frameworks/Python.framework/Versions/3.9/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin
      node $@
    
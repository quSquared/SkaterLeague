Install Instructions

For Windows
http://docs.nativescript.org/angular/start/ns-setup-win 
http://docs.nativescript.org/angular/start/quick-setup

Install Android simulator use Android 5.1.1 (API 22) http://developer.telerik.com/featured/using-android-emulator-hybrid-mobile-apps-telerik-appbuilder/#managing-avds https://software.intel.com/en-us/android/articles/intel-hardware-accelerated-execution-manager

Run android simulator 
cd mobile 
tns livesync android --emulator --watch

For Mac
http://docs.nativescript.org/angular/start/ns-setup-os-x
http://brew.sh/

in terminal: brew install ruby

https://rubygems.org/gems/xcodeproj/versions/0.28.2
gem install xcodeproj -v 0.28.2
https://cocoapods.org/
sudo gem install cocoapods

tns deploy ios --emulator --justlaunch
tns livesync ios --watch
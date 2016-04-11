/* 
 * Copyright 2016 snipking.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import '../globalDefinition';
import cordovaApp from '../modules/mainModule';
import { Service1Interface } from '../services/Service1';
/**
 * can require pages with file-loader @ webpack
 * or let gulp go through html files
 */ 
//require('file?name=pages/[name].[ext]!../../pages/page1.html');

interface Page1ControllerInterface extends ng.IScope {
    events: page1Controller;
}

export class page1Controller {
    static $inject = ["$scope", "$log", "$ocLazyLoad", "$window", "service1"];

    constructor(private $scope: Page1ControllerInterface, private $log: ng.ILogService, private $ocLazyLoad: oc.ILazyLoad, private $window: GlobalDefinitionInterface, private service1: Service1Interface) {
        $scope.events = this;
    }

    pushPage() {
        let $log = this.$log;
        let $ocLazyLoad = this.$ocLazyLoad;
        let $window = this.$window;
        let service1 = this.service1;
//        require.ensure(["./page2Controller"], function(require) {
//            // load script
//            var page2Controller = require("./page2Controller");
//            // inject angular module to current app module
//            $ocLazyLoad.inject(cordovaApp.name).then(function(args: any) {
//                $log.debug('will push page');
//                $window.globalNavigator.pushPage('pages/page2.html', { animation: 'slide' });
//            }, function(err: any) {
//                $log.error(err);
//            });
//        }, "page2module");
        require.ensure(["../modules/page2Module"], function(require) {
            service1.printToLog("Async load module '../modules/page2Module'");
            // load script
            var page2Module = require("../modules/page2Module");
            // inject angular module to current app module
            $ocLazyLoad.inject('app.page2Module').then(function(args: any) {
                service1.printToLog("will push page");
                $window.globalNavigator.pushPage('pages/page2.html', { animation: 'slide' });
            }, function(err: any) {
                $log.error(err);
            });
        }, "page2module");
    }
}


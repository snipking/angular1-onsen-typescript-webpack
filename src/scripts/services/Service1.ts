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

export interface Service1Interface {
    /*
     * Define a function return a promise with any type.
     * Also can define ng.IPromise<{}> or precies type like ng.IPromise<string>.
     * But there use an 'any' type to lower code complex/
     * See also: https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns
     */
    printToLog(paramStr: string) : ng.IPromise<any>;
}

export class Service1 implements Service1Interface {
    static $inject = ['$log'];
    constructor(private $log: ng.ILogService){}
    
    printToLog(paramStr: string) : ng.IPromise<any> {
        this.$log.info("print from Service1: " + paramStr);
        return undefined;
    }
}


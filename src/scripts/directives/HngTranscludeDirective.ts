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

export interface HngTranscludeInterface extends ng.IAttributes {
    hngDirective1: string;
}

export class HngTranscludeDirective implements ng.IDirective {

    scope = true;
    restrict = "E";
    templateUrl = "pages/template/tplLeftRight.html";
    transclude: { [slot: string]: string } = { "slot1": "hngTranscludeSlot1", "slot2": "hngTranscludeSlot2" };
    constructor(private $log: ng.ILogService) {
    }

    static instance(): ng.IDirectiveFactory {
        const directive = ($log: ng.ILogService) => new HngTranscludeDirective($log);
        directive.$inject = ['$log'];
        return directive;
    }

    link = ($scope: ng.IScope, elm: Element, attr: HngTranscludeInterface, ngModel: ng.INgModelController): void => {
        
    }
}
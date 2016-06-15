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

export interface HngTranscludeDynamicInterface extends ng.IAttributes {
    layoutCode: string;
}

export class HngTranscludeDynamicDirective implements ng.IDirective {

    scope = {"layoutCode": "="};
    restrict = "E";
//    transclude: { [slot: string]: string } = { "slot1": "hngTranscludeSlot1", "slot2": "hngTranscludeSlot2" };
    transclude = true;
    constructor(private $log: ng.ILogService, private $compile: ng.ICompileService, private $templateRequest: ng.ITemplateRequestService, private $timeout: ng.ITimeoutService) {
    }

    static instance(): ng.IDirectiveFactory {
        const directive = ($log: ng.ILogService, $compile: ng.ICompileService, $templateRequest: ng.ITemplateRequestService, $timeout: ng.ITimeoutService) => new HngTranscludeDynamicDirective($log, $compile, $templateRequest, $timeout);
        directive.$inject = ['$log', '$compile', '$templateRequest', '$timeout'];
        return directive;
    }

    link = ($scope: ng.IScope, $element: ng.IAugmentedJQuery, attr: HngTranscludeDynamicInterface, ngModel: ng.INgModelController, transclude: ng.ITranscludeFunction): void => {
        let $templateRequest = this.$templateRequest;
        let $compile = this.$compile;
        let $timeout = this.$timeout;
        
        $scope.$watch('layoutCode', () => { // watch layout change then change template
            $templateRequest('pages/template/' + $scope['layoutCode'] + '.html').then((html) => { // load template
                var template = angular.element(html);
                $element.children().remove();  // remove exist children nodes
                $element.append(template);  // apply loaded template
                let compiledTemplate = $compile(template)($scope);
                $timeout(() => { // wait for $digest
                    transclude((clonedElement: JQuery) => {
                        let transcludeItems: { [key: string]: HTMLElement } = {};
                        for (let index = 0; index < clonedElement.length; index++) { // find all transclude HTMLElement for later use
                            if (clonedElement.eq(index)[0] instanceof HTMLElement) {
                                transcludeItems[clonedElement.eq(index)[0].tagName.toLowerCase()] = clonedElement.eq(index)[0];
                            }
                        }
                        for (let index = 0; index < compiledTemplate.length; index++) {
                            if (compiledTemplate.eq(index)[0] instanceof HTMLElement) {
                                for (let transcludeItem in transcludeItems) { // append transclude HTMLElement to comipled template node which has attribute 'hng-transclude-dynamic=<transcludeItemTag>'
                                    let items: NodeListOf<Element> = compiledTemplate.eq(index)[0].querySelectorAll('[hng-transclude-dynamic=' + transcludeItem + ']')
                                    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                                        (<HTMLElement>items.item(itemIndex)).appendChild(transcludeItems[transcludeItem]);
                                    }
                                }

                            }
                        }
                    });
                }, 0); 
            
            });
        });
        
    }
}
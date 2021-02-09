/**
 * Copyright 2021 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs';
import path from 'path';
import packageJson from '../package.json';

const typingsLocation = path.resolve(process.cwd(), packageJson.types);

const fileContents = fs.readFileSync(typingsLocation, { encoding: 'utf-8' });

// Default to exposing the Node package as this is the majority of our use case.
// May need reworking in the future when we ship an officially supported browser
// bundle also.
const defaultExportCode = `declare const puppeteer: PuppeteerNode;
export = puppeteer;`;

const newFileContents = fileContents + `\n${defaultExportCode}`;

fs.writeFileSync(typingsLocation, newFileContents);

// Copyright 2012 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

var records;
function observer(r) {
  records = r;
}
function observe(object) {
  Object.observe(object, observer);
}
function deliver() {
  Object.deliverChangeRecords(observer);
}

// Push
(function() {
  var array = {0: 1, 1: 2, length: 2}
  observe(array);
  Array.prototype.push.call(array, 3, 4);
  deliver();

  assertEquals(3, records.length);

  assertEquals('new', records[0].type);
  assertEquals('2', records[0].name);
  assertFalse(records[0].hasOwnProperty('oldValue'));

  assertEquals('new', records[1].type);
  assertEquals('3', records[1].name);
  assertFalse(records[1].hasOwnProperty('oldValue'));

  assertEquals('updated', records[2].type);
  assertEquals('length', records[2].name);
  assertEquals(2, records[2].oldValue);
})();

// Pop
(function() {
  var array = {0: 1, 1: 2, length: 2};
  observe(array);
  Array.prototype.pop.call(array);
  Array.prototype.pop.call(array);
  deliver();

  assertEquals(4, records.length);

  assertEquals('deleted', records[0].type);
  assertEquals('1', records[0].name);
  assertEquals(2, records[0].oldValue);

  assertEquals('updated', records[1].type);
  assertEquals('length', records[1].name);
  assertEquals(2, records[1].oldValue);

  assertEquals('deleted', records[2].type);
  assertEquals('0', records[2].name);
  assertEquals(1, records[2].oldValue);

  assertEquals('updated', records[3].type);
  assertEquals('length', records[3].name);
  assertEquals(1, records[3].oldValue);
})();

// Shift
(function() {
  var array = {0: 1, 1: 2, length: 2};
  observe(array);
  Array.prototype.shift.call(array);
  Array.prototype.shift.call(array);
  deliver();

  assertEquals(5, records.length);

  assertEquals('updated', records[0].type);
  assertEquals('0', records[0].name);
  assertEquals(1, records[0].oldValue);

  assertEquals('deleted', records[1].type);
  assertEquals('1', records[1].name);
  assertEquals(2, records[1].oldValue);

  assertEquals('updated', records[2].type);
  assertEquals('length', records[2].name);
  assertEquals(2, records[2].oldValue);

  assertEquals('deleted', records[3].type);
  assertEquals('0', records[3].name);
  assertEquals(2, records[3].oldValue);

  assertEquals('updated', records[4].type);
  assertEquals('length', records[4].name);
  assertEquals(1, records[4].oldValue);
})();

// Unshift
(function() {
  var array = {0: 1, 1: 2, length: 2};
  observe(array);
  Array.prototype.unshift.call(array, 3, 4);
  deliver();

  assertEquals(5, records.length);

  assertEquals('new', records[0].type);
  assertEquals('3', records[0].name);
  assertFalse(records[0].hasOwnProperty('oldValue'));

  assertEquals('new', records[1].type);
  assertEquals('2', records[1].name);
  assertFalse(records[1].hasOwnProperty('oldValue'));

  assertEquals('updated', records[2].type);
  assertEquals('0', records[2].name);
  assertEquals(1, records[2].oldValue);

  assertEquals('updated', records[3].type);
  assertEquals('1', records[3].name);
  assertEquals(2, records[3].oldValue);

  assertEquals('updated', records[4].type);
  assertEquals('length', records[4].name);
  assertEquals(2, records[4].oldValue);
})();

// Splice
(function() {
  var array = {0: 1, 1: 2, 2: 3, length: 3};
  observe(array);
  Array.prototype.splice.call(array, 1, 1, 4, 5);
  deliver();

  assertEquals(4, records.length);

  assertEquals('new', records[0].type);
  assertEquals('3', records[0].name);
  assertFalse(records[0].hasOwnProperty('oldValue'));

  assertEquals('updated', records[1].type);
  assertEquals('1', records[1].name);
  assertEquals(2, records[1].oldValue);

  assertEquals('updated', records[2].type);
  assertEquals('2', records[2].name);
  assertEquals(3, records[2].oldValue);

  assertEquals('updated', records[3].type);
  assertEquals('length', records[3].name);
  assertEquals(3, records[3].oldValue);
})();

V8 - Experimental Support for Object.observe
=============

This branch of the [V8 JavaScript Engine](http://code.google.com/p/v8) features
a highly experimental implementation of the proposed Object.observe addition to ECMAScript.

* Object.observe strawman: http://wiki.ecmascript.org/doku.php?id=strawman:observe

The API provided by Object.observe is fairly low-level. For
example, it requires that you separately observe each object that you
wish to be notified about. For a more convenient interface that allows
observation of an arbitrarily-deep hierarchy of objects, as well as
more convenient observation of arrays, we recommend using the
[ChangeSummary library](https://github.com/rafaelw/ChangeSummary), which
is built on top of Object.observe.

Caveats
-----
This is an experimental implementation of a not-yet-accepted proposed
addition to ECMAScript. It's only meant to let developers get a feel for
the API and elicit feedback, not to be the basis for any "real"
projects.

Moreover, the added V8 code is very rough (expect crashes here and
there). Various V8 optimizations (such as the inline cache) have been
disabled in order to ensure proper operation. Performance testing of
this branch should not be expected to yield valid results.

How can I try it out?
-----
Pre-built versions of Chromium supporting Object.observe are available
for download:

* Windows: https://commondatastorage.googleapis.com/chromium-browser-mdv/object-observe/Chromium_Win_object-observe.zip
* Mac: https://commondatastorage.googleapis.com/chromium-browser-mdv/object-observe/Chromium_Mac_object-observe.tgz

You can also build your own, by cloning this repo into a Chromium
checkout. See below.

Or, you can build V8 on its own (including the d8 shell), by following the instructions at
http://code.google.com/p/v8/wiki/BuildingWithGYP.

Build instructions (Chromium)
-----
Follow the normal [Chromium build instructions](http://dev.chromium.org/Home), but
edit your .gclient file and add the following line to your "custom_deps"
section:

    "src/v8": None

Then remove the old v8, clone this repo, rerun gclient, and build:

    $ cd src
    $ rm -rf v8
    $ git clone git://github.com/rafaelw/v8.git
    $ gclient runhooks
    $ ninja -C out/Release chrome  # or whichever build system you use

Feedback
-----
The point of this implementation is to allow JavaScript developers to experiment with the feature and provide feedback in advance of the feature being included in the specification. Please provide feedback to the [es-discuss mailing list](https://mail.mozilla.org/listinfo/es-discuss/). The email to es-discuss announcing the availability of this implementation is [here](https://mail.mozilla.org/pipermail/es-discuss/2012-August/024547.html).

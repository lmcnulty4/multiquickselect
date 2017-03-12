"use strict";

var test = require("tape").test;
var mqs = require("./");

function isArraySorted(arr) {
    for (var i = 0; i < arr.length - 1; ++i) {
        if (arr[i] > arr[i+1]) { // if current el is greater than next
            return false;
        }
    }
    return true;
}

function isArrayBucketed(arr, bucketSize) {
    var bucketCount = Math.floor(arr.length / bucketSize), i;
    for (var bucketIndex = 0; bucketIndex < bucketCount - 1; ++bucketIndex) {
        // Get the low index and high index of current bucket
        var curLo = bucketIndex * bucketSize;
        var curHi = Math.min((bucketIndex + 1) * bucketSize, arr.length);
        // Get the low index and high index of next bucket
        var nxtLo = curHi;
        var nxtHi = Math.min((bucketIndex + 2) * bucketSize, arr.length);
        // Get max of current bucket
        var curBucketMax = arr[curLo];
        for (i = curLo; i < curHi; ++i) {
            curBucketMax = Math.max(curBucketMax, arr[i]);
        }
        // Compare to all of next bucket
        for (i = nxtLo; i < nxtHi; ++i) {
            if (arr[i] < curBucketMax) {
                return false;
            }
        }
    }
    return true;
}

function generateUniformlyDistributedArray(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(n * Math.random());
    }
    return arr;
}
function generateIdenticalArray(n) {
    var arr = [], val = (Math.random() * n)|0;
    for (var i = 0; i < n; i++) {
        arr.push(val);
    }
    return arr;
}

test("mqs does not sort", function (t) {
    var arr = generateUniformlyDistributedArray(500);
    mqs(arr, 20);
    t.equal(isArraySorted(arr), false, "Routine is not performing a full sort.");
    t.end();
});

test("mqs routine buckets", function(t) {
    var arr = generateUniformlyDistributedArray(500), bucketSize = 20;
    mqs(arr, bucketSize);
    t.equal(isArrayBucketed(arr, bucketSize), true, "Routine is performing correct bucketing.");
    t.end();
});

test("mqs routine buckets identical data", function(t) {
    var arr = generateIdenticalArray(500), bucketSize = 20;
    mqs(arr, bucketSize);
    t.equal(isArrayBucketed(arr, bucketSize), true, "Routine is performing correct bucketing.");
    t.end();
});
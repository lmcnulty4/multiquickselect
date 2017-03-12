"use strict";

module.exports = function(arr, numPerGroup, left, right, compare) {
    left = left || 0;
    right = right || (arr.length - 1);
    var numGrps = Math.floor((right - left) / numPerGroup);
    if (numGrps === 0) return;
    multiQuickSelect(arr, left, right, numPerGroup, numGrps - 1, compare || defaultCompare);
};

function multiQuickSelect(arr, alo, ahi, numPerGroup, oshi, compare) {
    var k, q, left, right, bottom, top, e;
    numPerGroup = numPerGroup|0;
    var stack = [alo|0, ahi|0, 0, oshi|0];
    while (stack.length > 0) {
        top = stack.pop();
        bottom = stack.pop();
        right = stack.pop();
        left = stack.pop();
        k = partitionSinglePivot(arr, left, right, compare); // partition so all < k are below it and all > k are above it
        if (k < alo + (bottom + 1) * numPerGroup - 1) { // -> then k came before first group
            stack.push(k + 1, right, bottom, top);
        } else {
            e = (k + 1 - alo) / numPerGroup;
            q = (e - 1)|0;
            if (e === (e|0)) { // -> k was an exact match for a bucket/order statistic
                q < top && stack.push(k + 1, right, q + 1, top); // only continue for those above k
                bottom < q && q > 0 && stack.push(left, k - 1, bottom, q - 1); // and for those below k
            } else { // -> k was not an exact match
                q < top && stack.push(k, right, q + 1, top);
                q >= 0 && bottom <= q && stack.push(left, k - 1, bottom, q);
            }
        }
    }
}

function partitionSinglePivot(arr, lo, hi, compare) {
    var i = lo|0, j = (hi - 1)|0, pivot = medianOf3(arr, lo, hi, compare); // why must medianOf3 be done before early return line below?
    if (i >= j) return i;
    while (true) {
        do {
            i++;
        } while (compare(arr[i],pivot) < 0);
        do {
            j--;
        } while (compare(arr[j],pivot) > 0);

        if (i >= j) break;
        swap(arr, i, j);
    }
    swap(arr, i, hi - 1); // restore pivot
    return i; // return pivot location
}

// pivot selection via median of 3
function medianOf3(arr, left, right, compare) {
    var center = (left + (right - left) / 2)|0;
    if (compare(arr[center], arr[left]) < 0) // order left & center
        swap(arr, left, center);
    if (compare(arr[right], arr[left]) < 0) // order left & right
        swap(arr, left, right);
    if (compare(arr[right], arr[center]) < 0) // order center & right
        swap(arr, center, right);
    swap(arr, center, right - 1); // put pivot on right
    return arr[right - 1]; // return value of pivot
}

function swap(arr, i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
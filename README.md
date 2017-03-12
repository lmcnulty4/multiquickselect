# multiquickselect

Rearranges items in an array into equal sized buckets such that the elements within a single bucket are not sorted, but all elements in a single bucket are guaranteed to be less than all elements in the next bucket.

```js
multiquickselect(arr, bucketSize[, left, right, compareFn]);
```

Bucketing is done between `left` and `right`, which default to `0` and `arr.length - 1` respectively.

Parameters:
- `arr`: The array to be bucketed in place.
- `bucketSize`: the number of elements each bucket should have.
- `left`: the left index to bucket from.
- `right`: the right index to bucket to.
- `compareFn`: the comparison function (follows the standard form of `array.sort`'s comparison function).

Should there not be enough space between `left` and `right` for a single bucket, this routine will do nothing. 

Should there be an unequal amount of space (for example, asking for buckets of size 40 on a 100 element array), this routine will set the size of the final bucket within the array as lesser than the others (so the buckets in the above example would be 0-39, 40-79, 80-99).

Inspired somewhat by Vladimir Agafonkin's [RBush](https://github.com/mourner/RBush) and its use of [quickselect](https://github.com/mourner/quickselect) internally.
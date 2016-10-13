var coinBreak = require('../broken')
var fixtures = require('./fixtures/broken')
var tape = require('tape')
var utils = require('./_utils')

fixtures.forEach(function (f, k) {
  tape(f.description, function (t) {
    var inputs = utils.valuesToObjects(f.inputs)
    var output = utils.valuesToObjects([f.output])[0]
    var result = coinBreak(inputs, output, f.feeRate)

    // ensure arguments were not modified
    t.equal(inputs.length, f.inputs.length)

    // drop unneeded data for result comparison
    if (result.inputs) {
      t.equal(result.inputs, inputs)
      result.inputs = true
    }

    if (result.outputs) {
      result.outputs = utils.objectsToValues(result.outputs)
    }

    t.deepEqual(result, f.expected)
    t.end()
  })
})

tape('fails for non-finite value', function (t) {
  t.plan(2)
  t.throws(function () {
    coinBreak([], { value: NaN }, 20)
  })

  t.throws(function () {
    coinBreak([], {}, 20)
  })
})

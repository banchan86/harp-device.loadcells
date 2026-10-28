// Renders the device metadata that Harp.Generators stores in the `harp` property of
// generated register, payload and mask pages. Details are added ahead of any
// hand-written conceptual content; payload members and mask values replace the
// built-in member listing with a single table.
var common = require('./common.js');

exports.preTransform = function (model) {
  var harp = model.harp;
  if (!harp) return model;

  var html = '';
  if (harp.register) {
    html += detailsTable(registerRows(model, harp.register));
  }
  if (harp.payload) {
    html += detailsTable(payloadRows(model, harp.payload));
    html += memberTable(model, payloadColumns);
  }
  if (harp.bitMask || harp.groupMask) {
    html += detailsTable(maskRows(model, harp.bitMask, harp.groupMask));
    html += memberTable(model, maskColumns);
  }

  model.conceptual = html + (model.conceptual || '');
  return model;
};

exports.postTransform = function (model) {
  return model;
};

function registerRows(model, register) {
  return [
    ['Address', register.address],
    ['Payload type', code(register.payloadType)],
    ['Length', register.length],
    ['Access', (register.access || []).join(', ')],
    ['Default value', register.defaultValue],
    ['Minimum value', register.minValue],
    ['Maximum value', register.maxValue],
    ['Interface type', typeLink(register.interfaceType)],
    ['Python name', code(langValue(model.name, 'python'))],
    ['Log file', code(register.logFile)]
  ];
}

function payloadRows(model, payload) {
  return [
    ['Registers', (payload.registers || []).map(typeLink).join(', ')],
    ['Python name', code(langValue(model.name, 'python'))]
  ];
}

function maskRows(model, bitMask, groupMask) {
  return [
    ['Mask kind', bitMask ? 'Bit mask' : 'Group mask'],
    ['Underlying type', code((bitMask || groupMask).type)],
    ['Python name', code(langValue(model.name, 'python'))]
  ];
}

var payloadColumns = [
  ['Offset', function (m) { return m.offset; }],
  ['Length', function (m) { return m.length; }],
  ['Mask', function (m) { return code(m.mask); }],
  ['Default value', function (m) { return m.defaultValue; }],
  ['Minimum value', function (m) { return m.minValue; }],
  ['Maximum value', function (m) { return m.maxValue; }],
  ['Interface type', function (m) { return typeLink(m.interfaceType); }]
];

var maskColumns = [
  ['Value', function (m) { return code(m.value); }]
];

function memberTable(model, columns) {
  var children = memberItems(model);
  if (children.length === 0) return '';

  var rows = children.map(function (child) {
    var details = child.harp ? (child.harp.member || child.harp.maskValue || {}) : {};
    return {
      id: common.getHtmlId(child.uid),
      name: langValue(child.name, 'csharp'),
      python: langValue(child.name, 'python'),
      values: columns.map(function (column) { return column[1](details); }),
      summary: child.summary || ''
    };
  });

  // Only show detail columns that have a value for at least one member
  var shown = columns.map(function (column, i) {
    return rows.some(function (row) { return hasValue(row.values[i]); });
  });
  var hasSummary = rows.some(function (row) { return row.summary; });

  var html = '<h2 id="members">Members</h2>\n<table class="table table-bordered table-condensed">\n<thead><tr><th>Name</th><th>Python name</th>';
  columns.forEach(function (column, i) {
    if (shown[i]) html += '<th>' + column[0] + '</th>';
  });
  if (hasSummary) html += '<th>Description</th>';
  html += '</tr></thead>\n<tbody>\n';
  rows.forEach(function (row) {
    html += '<tr><td id="' + row.id + '">' + escape(row.name) + '</td><td>' + code(row.python) + '</td>';
    row.values.forEach(function (value, i) {
      if (shown[i]) html += '<td>' + text(value) + '</td>';
    });
    if (hasSummary) html += '<td>' + row.summary + '</td>';
    html += '</tr>\n';
  });
  html += '</tbody>\n</table>\n';

  // The table replaces the built-in member listing
  model.children = [];
  return html;
}

// Children arrive grouped by language; every language lists the same members
function memberItems(model) {
  var groups = model.children || [];
  for (var i = 0; i < groups.length; i++) {
    if (groups[i] && groups[i].value) return groups[i].value;
  }
  return [];
}

function detailsTable(rows) {
  var html = '';
  rows.forEach(function (row) {
    if (hasValue(row[1])) {
      html += '<tr><th scope="row">' + row[0] + '</th><td>' + text(row[1]) + '</td></tr>\n';
    }
  });
  return html ? '<table class="table table-bordered table-condensed harp-details">\n<tbody>\n' + html + '</tbody>\n</table>\n' : '';
}

function langValue(values, lang) {
  if (!values) return '';
  if (typeof values === 'string') return values;
  for (var i = 0; i < values.length; i++) {
    if (values[i].lang === lang) return values[i].value;
  }
  return values.length > 0 ? values[0].value : '';
}

function typeLink(type) {
  if (!type) return '';
  if (!type.uid) return code(type.name);
  return '<xref uid="' + escape(type.uid) + '" displayProperty="name"/>';
}

function code(value) {
  return hasValue(value) ? '<code>' + escape(value) + '</code>' : '';
}

function text(value) {
  return typeof value === 'number' ? String(value) : (value || '');
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== '';
}

function escape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

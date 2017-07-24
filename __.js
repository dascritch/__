'use strict';

var __ = {
    i18n : {},
    prefered_language_order : [],

    _key : function(key) {
        return '{{'+key+'}}';
    },
    has_key : function(key) {
        return __._key(key) in __.i18n;
    },
    bracket_keys : function(dict) {
        var out = {};
        for(var key in dict) {
            out[__._key(key)] = dict[key];
        }
        return out;
    },

    push_prefered_language : function(code) {
        if (__.prefered_language_order.indexOf(code) < 0) {
            __.prefered_language_order.push(code);
        }
    },

    prefered_language : function() {
        return __.prefered_language_order[1];
    },
    _add_locale : function(i18n_applied, i18n_source) {
        if ((i18n_source === null) || (i18n_source[i18n_applied] === undefined)) {
            return;
        }
        for (var key in i18n_source[i18n_applied]) {
            __.i18n[__._key(key)] = i18n_source[i18n_applied][key];
        }
        __.push_prefered_language(i18n_applied);
    },
    /**
        * @param {string} key
        * @param {string=} subkey
    */
    s : function(key, subkey) {
        key = __._key(key);
        if (subkey === undefined) {
            return __.i18n[key];
        }
        // return __.i18n[key][__._key(subkey)];
        // je prends partie de simplifier. Oui, je me renie
        return __.i18n[key][subkey];
    },
    /**
        * @param {string} inner
        * @param {Object=} words
    */
    populate : function(inner, words) {
        words = (words === undefined) ? __.i18n : words;
        for (var key in words) {
            inner = inner === null ? '' : (inner.replace(RegExp(key,'g'), words[key]));
        }
        return inner;
    },
    date : function (date_iso) {
        var instant = new Date(date_iso);
        var words = __.bracket_keys( /** @dict */{
            'dayofmonth' : toInt(instant.getDate()),
            'month' : __.s('_month')[instant.getMonth()],
            'year' : instant.getFullYear()
        })
        return __.populate(__.s('_date'), words);
    },
    merge_source : function (i18n_source) {
        __._add_locale('-', i18n_source);
        // Là, on souffre...
        var languages = window.navigator.languages ;
        var languages = (languages !== undefined) ? 
                        languages : 
                        [(navigator.language || navigator.browserLanguage)];
        var added = false;
        for (var entry in languages) {
            var line = languages[entry];
            if (line.split) {
                // on extrait le code générique xx de xx-YY 
                var code = line.split('-')[0];
                if ((!added) && (typeof i18n_source === 'object') && (i18n_source !== null) && (i18n_source[code] !== undefined)) {
                    __._add_locale(code, i18n_source);
                    added = true;
                }
            }
        }
        return added;
    }
};

export default __;
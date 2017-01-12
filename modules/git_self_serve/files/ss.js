// Generated by CoffeeScript 1.9.3
var app, changePMC, changePodling, changeName, generateBaseName, cog, fetch, get, globArgs, isArray, mk, post, postJSON, renderForm, rewrites, set, setupForm, submitForm, swi, txt;

Number.prototype.pretty = function (fix) {
    if (fix) {
        return String(this.toFixed(fix)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    return String(this.toFixed(0)).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

fetch = function (url, xstate, callback, snap) {
    var xmlHttp;
    xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.withCredentials = true;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    return xmlHttp.onreadystatechange = function (state) {
        var e, response;
        if (xmlHttp.readyState === 4 && xmlHttp.status === 500) {
            if (snap) {
                snap(xstate);
            }
        }
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (callback) {
                try {
                    response = JSON.parse(xmlHttp.responseText);
                    return callback(response, xstate);
                } catch (_error) {
                    e = _error;
                    return callback(JSON.parse(xmlHttp.responseText), xstate);
                }
            }
        }
    };
    // leave this line around, helps test when you're not really deployed.
    // also gives a clearer documentation of the API response from the lua script
    // return callback({pmcs:['incubator','infrastructure','whimsy','flerp','logging']}, undefined);
};

post = function (url, args, xstate, callback, snap) {
    var ar, fdata, k, v, xmlHttp;
    xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.withCredentials = true;
    ar = [];
    for (k in args) {
        v = args[k];
        if (v && v !== "") {
            ar.push(k + "=" + escape(v));
        }
    }
    fdata = ar.join("&");
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(fdata);
    return xmlHttp.onreadystatechange = function (state) {
        var e, response;
        if (xmlHttp.readyState === 4 && xmlHttp.status === 500) {
            if (snap) {
                snap(xstate);
            }
        }
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (callback) {
                try {
                    response = JSON.parse(xmlHttp.responseText);
                    return callback(response, xstate);
                } catch (_error) {
                    e = _error;
                    return callback(JSON.parse(xmlHttp.responseText), xstate);
                }
            }
        }
    };
};

postJSON = function (url, json, xstate, callback, snap) {
    var fdata, xmlHttp;
    xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.withCredentials = true;
    fdata = JSON.stringify(json);
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(fdata);
    return xmlHttp.onreadystatechange = function (state) {
        var e, response;
        if (xmlHttp.readyState === 4 && xmlHttp.status === 500) {
            if (snap) {
                snap(xstate);
            }
        }
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (callback) {
                try {
                    response = JSON.parse(xmlHttp.responseText);
                    return callback(response, xstate);
                } catch (_error) {
                    e = _error;
                    return callback(JSON.parse(xmlHttp.responseText), xstate);
                }
            }
        }
    };
};

mk = function (t, s, tt) {
    var j, k, len, r, v;
    r = document.createElement(t);
    if (s) {
        for (k in s) {
            v = s[k];
            if (v) {
                r.setAttribute(k, v);
            }
        }
    }
    if (tt) {
        if (typeof tt === "string") {
            app(r, txt(tt));
        } else {
            if (isArray(tt)) {
                for (j = 0, len = tt.length; j < len; j++) {
                    k = tt[j];
                    if (typeof k === "string") {
                        app(r, txt(k));
                    } else {
                        app(r, k);
                    }
                }
            } else {
                app(r, tt);
            }
        }
    }
    return r;
};

app = function (a, b) {
    var item, j, len, results;
    if (isArray(b)) {
        results = [];
        for (j = 0, len = b.length; j < len; j++) {
            item = b[j];
            if (typeof item === "string") {
                item = txt(item);
            }
            results.push(a.appendChild(item));
        }
        return results;
    } else {
        return a.appendChild(b);
    }
};

set = function (a, b, c) {
    return a.setAttribute(b, c);
};

txt = function (a) {
    return document.createTextNode(a);
};

get = function (a) {
    return document.getElementById(a);
};

swi = function (obj) {
    var switchery;
    return switchery = new Switchery(obj, {
        color: '#26B99A'
    });
};

cog = function (div, size) {
    var i, idiv;
    if (size == null) {
        size = 200;
    }
    idiv = document.createElement('div');
    idiv.setAttribute("class", "icon");
    idiv.setAttribute("style", "text-align: center; vertical-align: middle; height: 500px;");
    i = document.createElement('i');
    i.setAttribute("class", "fa fa-spin fa-cog");
    i.setAttribute("style", "font-size: " + size + "pt !important; color: #AAB;");
    idiv.appendChild(i);
    idiv.appendChild(document.createElement('br'));
    idiv.appendChild(document.createTextNode('Loading, hang on tight..!'));
    div.innerHTML = "";
    return div.appendChild(idiv);
};

globArgs = {};

isArray = function (value) {
    return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number' && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
};

Array.prototype.remove = function (a) {
    var i, item, j, len;
    for (i = j = 0, len = this.length; j < len; i = ++j) {
        item = this[i];
        if (item === a) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
};

rewrites = {
    whimsy: 'whimsical',
    infrastructure: 'infra',
    httpcomponents: 'hc',
    comdev: 'community',
    webservices: 'ws',
    empire: 'empire-db'
};

setupForm = function () {
    return fetch("ss.lua?action=pmcs", null, renderForm);
};

submitForm = function (form) {
    var bno, byes, c, d, description, ghnotify, notify, p, pmc, rc, reponame;
    pmc = get('pmc').value;
    if (!pmc || pmc.length === 0) {
        alert("Please pick a PMC first!");
        return false;
    }
    description = get('description').value;
    if (description.length === 0) {
        alert("You must enter a description of the repository!");
        return false;
    }
    notify = get('notify').value;
    if (!notify.match(/.+@.+\.apache\.org/i)) {
        alert("Notification list needs to be an apache.org mailing list!");
        return false;
    }
    ghnotify = get('ghnotify').value;
    if (!ghnotify.match(/.+@.+\.apache\.org/i)) {
        alert("GitHub notification list needs to be an apache.org mailing list!");
        return false;
    }
    reponame = get('reponame').value;
    var generatedName = get('generatedname').value;
    if (reponame.length === 0) {
        if (!confirm("You have not entered a sub-name. This will request " + generatedName + "! Are you sure?")) {
            return false;
        }
    }
    var sendRepoName = generateBaseName();
    if (!sendRepoName) {
        sendRepoName = '-';
    }
    else if (sendRepoName.startsWith('-')) {
        sendRepoName = sendRepoName.substring(1);
    }
    rc = get('confirm').getAttribute("data");
    if (rc && rc === 'yes') {
        var payload = {
            create: "yes",
            pmc: pmc,
            name: sendRepoName,
            description: description,
            notify: notify,
            ghnotify: ghnotify
        };
        post("ss.lua", payload, null, null);
        get('confirm').innerHTML = '';
        get('confirm').setAttribute("data", "no");
        alert("Request submitted! It may take up to an hour before the repository is created.");
    } else {
        c = get('confirm');
        c.setAttribute("data", "no");
        c.innerHTML = "";
        p = mk('p', {
            style: "font-size: 14pt;"
        }, "This will create https://git-wip-us.apache.org/repos/asf/" + generatedName + ", notifications will go to " + notify + ". Are you sure you wish to continue?");
        app(c, p);
        d = mk('div');
        app(c, d);
        byes = mk('input', {
            type: "button",
            value: "YES",
            style: "background: #494; color: #FFF; font-weight: bold; margin-left: 40px;",
            onclick: "get('confirm').setAttribute('data', 'yes'); submitForm(get('repoform').form);"
        });
        bno = mk('input', {
            type: "button",
            value: "NO",
            style: "background: #944; color: #FFF; font-weight: bold; margin-left: 40px;",
            onclick: "get('confirm').setAttribute('data', 'no'); get('confirm').innerHTML = '';"
        });
        app(d, byes);
        app(d, bno);
        c.setAttribute("data", reponame);
    }
    return false;
};

changeName = function () {
    var generatedName = generateBaseName();
    if (!generatedName) {
        generatedName = '';
    }
    get('generatedname').value = get('pmc').value + generatedName + '.git';
};

generateBaseName = function () {
    var generatedName = '';
    var podling = get('podlingname').value;
    var name = get('reponame').value;
    if (podling != '') {
        generatedName += '-' + podling;
    }
    if (name != '') {
        generatedName += '-' + name;
    }
    return generatedName;
};

changePMC = function (pmc) {
    if (rewrites[pmc]) {
        pmc = rewrites[pmc];
    }
    if (pmc == 'incubator') {
        get('podlingdiv').style.display = 'block';
    }
    else {
        get('podlingdiv').style.display = 'none';
        get('podlingname').value = '';
        get('notify').value = "commits@" + pmc + ".apache.org";
        get('ghnotify').value = "dev@" + pmc + ".apache.org";
        get('description').value = "Apache " + pmc;
    }
    changeName();
};

changePodling = function () {
    var podling = get('podlingname').value;
    get('notify').value = "commits@" + podling + ".incubator.apache.org";
    get('ghnotify').value = "dev@" + podling + ".incubator.apache.org";
    changeName();
    return get('description').value = "Apache " + podling + " (Incubating)";
};

renderForm = function (json, state) {
    var d, form, j, len, main, options, ref;
    var reponamediv, reponameinput, reponametext;
    var podlingnamediv, podlingnametext, podlingnameinput;
    var pmcdiv, pmctext, pmcselect;
    var generateddiv, generatedtext, generatednameinput;
    form = mk('form', {
        onsubmit: 'return submitForm(this.form);',
        id: "repoform"
    });
    options = [
        mk('option', {
            selected: true,
            disabled: true,
            value: ''
        }, 'Your PMCs')
    ];
    ref = json.pmcs;
    for (j = 0, len = ref.length; j < len; j++) {
        var pmc = ref[j];
        options.push(mk('option', {
            value: pmc
        }, pmc));
    }

    var textdivStyle = "float: left; width: 200px; font-weight: bold;";
    var divStyle = "position:relative;overflow: auto;border-bottom: 1px solid #CCC; padding-bottom: 6px; margin-bottom: 6px;";
    var inputDivStyle = "float: left; width: 400px;";

    pmcdiv = mk('div', {
        style: divStyle
    });
    pmctext = mk('div', {
        style: textdivStyle
    }, "PMC: ");
    pmcselect = mk('div', {
        style: inputDivStyle
    }, mk('select', {
        onchange: "changePMC(this.value);",
        style: 'width: 200px;',
        'id': 'pmc'
    }, options));

    reponametext = mk('div', {
        style: textdivStyle
    }, "Repository name: ");
    reponamediv = mk('div', {
        style: divStyle
    });
    reponameinput = mk('div', {
        style: inputDivStyle
    }, [
        mk('input', {
            style: 'width: 200px;',
            'id': 'reponame',
            type: 'text',
            onblur: 'changeName();'
        })
    ]);

    podlingnamediv = mk('div', {
        style: divStyle + "display:none;",
        id: 'podlingdiv'
    });
    podlingnametext = mk('div', {
        style: textdivStyle
    }, "Podling name: ");
    podlingnameinput = mk('div', {
        style: inputDivStyle
    }, [
        mk('input', {
            style: 'width: 200px;',
            'id': 'podlingname',
            type: 'text',
            onblur: 'changePodling();'
        })
    ]);

    generatedtext = mk('div', {
        style: textdivStyle
    }, "Generated name: ");
    generateddiv = mk('div', {
        style: divStyle
    });
    generatednameinput = mk('div', {
        style: inputDivStyle
    }, [
        mk('input', {
            style: 'width: 200px;',
            readonly: true,
            'id': 'generatedname',
            type: 'text'
        })
    ]);

    app(pmcdiv, pmctext);
    app(pmcdiv, pmcselect);

    app(reponamediv, reponametext);
    app(reponamediv, reponameinput);

    app(podlingnamediv, podlingnametext);
    app(podlingnamediv, podlingnameinput);

    app(generateddiv, generatedtext);
    app(generateddiv, generatednameinput);

    app(form, pmcdiv);

    app(form, podlingnamediv);

    app(form, reponamediv);

    app(form, generateddiv);

    d = mk('div', {
        style: divStyle
    }, [
        mk('div', {
            style: textdivStyle
        }, mk('b', null, "Repository description:")), mk('div', {
            style: "width: 450px; float: left;"
        }, mk('input', {
            style: inputDivStyle,
            placeholder: "Apache Foo Repo",
            id: "description"
        }))
    ]);
    app(form, d);
    d = mk('div', {
        style: divStyle
    }, [
        mk('div', {
            style: textdivStyle
        }, mk('b', null, "Commit notification list:")), mk('div', {
            style: "width: 450px; float: left;"
        }, mk('input', {
            style: inputDivStyle,
            placeholder: "dev@foo.apache.org",
            id: "notify"
        }))
    ]);
    app(form, d);
    d = mk('div', {
        style: divStyle
    }, [
        mk('div', {
            style: textdivStyle
        }, mk('b', null, "GitHub notification list:")), mk('div', {
            style: "width: 450px; float: left;"
        }, mk('input', {
            style: inputDivStyle,
            placeholder: "dev@foo.apache.org",
            id: "ghnotify"
        }))
    ]);
    app(form, d);
    app(form, mk('input', {
        type: 'submit',
        value: 'Submit request'
    }));
    main = get('form');
    return app(main, form);
};
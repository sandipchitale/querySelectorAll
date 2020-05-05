(function () {

    const body = document.body;
    const querySelectorAllSelectorInput = document.getElementById('query-slector-all-selector');
    const querySelectorAllButton = document.getElementById('query-slector-all-button');
    const clearButton = document.getElementById('clear');
    const querySelectorAllPre = document.getElementById('query-selector-all');

    function querySelectorAllForSelector() {

        clear();
        body.classList.add('waiting');
        setTimeout(() => {
            body.classList.remove('waiting');
        }, 500);

        const querySelectorAllSelector = querySelectorAllSelectorInput.value;
        if (querySelectorAllSelector.trim().length === 0) {
            return;
        }
        const idsExpression = `
        (function () {
            return Array.from(document.querySelectorAll('${querySelectorAllSelector}')).map(e => e.outerHTML.replace(/>[\\s\\S]*/gm, '>'));
        })();
                `;
        chrome.devtools.inspectedWindow.eval(idsExpression, {}, (querySelectorAllArray, returnStatus) => {
            if (querySelectorAllArray && querySelectorAllArray.length) {
                querySelectorAllArray.forEach((element, i) => {
                    code = document.createElement('code');
                    code.innerHTML = `<a class="inspect" element-ordinal="${i}">&#128269;</a> ${element.replace(/</g, '&lt;')}\n`;
                    querySelectorAllPre.appendChild(code);
                });

                let inspectAnchors = document.querySelectorAll('.inspect');
                // Convert buttons NodeList to an array
                let inspectAnchorArray = Array.prototype.slice.call(inspectAnchors);
                inspectAnchorArray.forEach((inspectAnchor) => {
                    inspectAnchor.onclick = inspect.bind(inspectAnchor, querySelectorAllSelector, inspectAnchor.getAttribute('element-ordinal'));
                    inspectAnchor.onmouseenter = highlight.bind(inspectAnchor, querySelectorAllSelector, inspectAnchor.getAttribute('element-ordinal'));
                    inspectAnchor.onmouseleave = unhighlight.bind(inspectAnchor, querySelectorAllSelector, inspectAnchor.getAttribute('element-ordinal'));

                });
            }
        });
    }

    querySelectorAllSelectorInput.on
    querySelectorAllButton.onclick = querySelectorAllForSelector;

    querySelectorAllSelectorInput.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            querySelectorAllForSelector();
        }
    });

    function clear() {
        querySelectorAllPre.innerHTML = '';
    }

    clearButton.onclick = clear;

    function highlight(selector, ordinal) {
        const highlightExpression = `document.querySelectorAll('${selector}').item(${ordinal}).style.outline = '1px solid red';`;
        chrome.devtools.inspectedWindow.eval(highlightExpression, {}, (returnedValue, returnStatus) => {
        });
    }

    function unhighlight(selector, ordinal) {
        const unhighlightExpression = `document.querySelectorAll('${selector}').item(${ordinal}).style.outline = 'inherit';`;
        chrome.devtools.inspectedWindow.eval(unhighlightExpression, {}, (returnedValue, returnStatus) => {
        });
    }

    function inspect(selector, ordinal) {
        const inspectExpression = `inspect(document.querySelectorAll('${selector}').item(${ordinal}))`;
        chrome.devtools.inspectedWindow.eval(inspectExpression, {}, (returnedValue, returnStatus) => {
        });
    }

    function copyToClipboard (text) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = text;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }

    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return (i + 'st').padStart(6);
        }
        if (j == 2 && k != 12) {
            return (i + 'nd').padStart(6);
        }
        if (j == 3 && k != 13) {
            return (i + 'rd').padStart(6);
        }
        return (i + 'th').padStart(6);
    }
})();

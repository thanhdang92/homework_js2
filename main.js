Validator = function(option) { 
    var formElement = document.querySelector(option.selector);

    if (formElement) {
        formElement.onsubmit = function (e) { 
            e.preventDefault();
            option.rules.forEach(rule => { 
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule)
            })
        }
        
        var selectorRules = {}; 
        var validate = function (inputElement, rule) { 
            // var errorMess = rule.test(inputElement.value);
            var rules = selectorRules[rule.selector];

            for (var i = 0; i < rules.length; i++) { 
                errorMess = rules[i](inputElement.value)
                if (errorMess) break;
            }
            
            var errorElement = inputElement.parentElement.querySelector(option.errorElement)
            if (errorMess) {
                errorElement.innerText = errorMess;
                inputElement.parentElement.classList.add('invalid')
            } else { 
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid')
            }
        }
            
        option.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector);
             // Lưu tất cả các rule vào trong object SelectorRules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else { 
                selectorRules[rule.selector] = [rule.test]; // gán cho selectorRules[rule.selector] = 1 mảng có giá trị là rule.test
            }

            if (inputElement) { 
                inputElement.onblur = function () { 
                    
                    validate(inputElement, rule);
                    
                }

                inputElement.oninput = function () { 
                    var errorElement = inputElement.parentElement.querySelector(option.errorElement)
                    if (inputElement.value) { 
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
                }

            }
        });
    }
}

Validator.isRequired = function (selector, mess) { 
    return {
        selector: selector, 
        test: function (value) { 
            return value ? undefined : mess || 'Vui long nhap truong nay'
        }
    }
}

Validator.isWebsite = function (selector, mess) { 
    return {
        selector: selector, 
        test: function (value) { 
            var regexWebsite = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)(?:\.[a-zA-Z]+)+$/;
            return regexWebsite.test(value) ? undefined : mess || "Vui long nhap dung Website";
        }
    }
}

Validator.isEmail = function (selector, mess) { 
    return {
        selector: selector, 
        test: function (value) { 
            var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regexEmail.test(value) ? undefined : mess || "Vui long nhap dung Email"
        }
    }
}

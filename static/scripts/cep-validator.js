(function() {
    'use strict';

    function cleanCEP(cep) {
        return cep.replace(/\D/g, '');
    }

    function formatCEP(cep) {
        const cleaned = cleanCEP(cep);
        if (cleaned.length === 8) {
            return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        return cleaned;
    }

    function isValidCEP(cep) {
        const cleaned = cleanCEP(cep);
        return /^[0-9]{8}$/.test(cleaned);
    }

    async function fetchCEPInfo(cep) {
        const cleaned = cleanCEP(cep);
        if (!isValidCEP(cleaned)) {
            return null;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar CEP');
            }
            const data = await response.json();
            
            if (data.erro) {
                return null;
            }
            
            return {
                cep: data.cep,
                logradouro: data.logradouro,
                complemento: data.complemento,
                bairro: data.bairro,
                localidade: data.localidade,
                uf: data.uf,
                ibge: data.ibge,
                gia: data.gia,
                ddd: data.ddd,
                siafi: data.siafi
            };
        } catch (error) {
            return null;
        }
    }

    function calculateShipping(cep) {
        const cleaned = cleanCEP(cep);
        if (!isValidCEP(cleaned)) {
            return null;
        }

        const cepNumber = parseInt(cleaned.substring(0, 3));
        
        const isSouth = cepNumber >= 80 && cepNumber < 90;
        const isSoutheast = cepNumber >= 1 && cepNumber < 40;
        const isCenterWest = cepNumber >= 70 && cepNumber < 80;
        const isNortheast = cepNumber >= 40 && cepNumber < 70;
        const isNorth = cepNumber >= 66 && cepNumber < 70;

        let basePrice = 0;
        if (isSouth || isSoutheast) {
            basePrice = 15.90;
        } else if (isCenterWest) {
            basePrice = 25.50;
        } else if (isNortheast) {
            basePrice = 30.75;
        } else if (isNorth) {
            basePrice = 35.80;
        } else {
            basePrice = 20.25;
        }

        const lastDigits = parseInt(cleaned.substring(5, 8));
        const variation = (lastDigits % 10) * 0.15;
        
        const expressPrice = (basePrice * 2.7) + variation;
        const standardPrice = basePrice + (variation * 0.6);

        return [
            {
                name: 'Expresso',
                description: 'Entrega em 1-2 dias úteis',
                price: Math.round(expressPrice * 100) / 100,
                days: '1-2 dias úteis'
            },
            {
                name: 'Padrão',
                description: 'Entrega em 5-7 dias úteis',
                price: Math.round(standardPrice * 100) / 100,
                days: '5-7 dias úteis'
            },
            {
                name: 'Econômico',
                description: 'Entrega em 10-15 dias úteis',
                price: 0,
                days: '10-15 dias úteis',
                free: true
            }
        ];
    }

    function initCEPInput(inputElement, options = {}) {
        const {
            onValid = null,
            onInvalid = null,
            onFetch = null,
            showShipping = false,
            shippingContainer = null
        } = options;

        let currentCEP = '';

        inputElement.addEventListener('input', function(e) {
            const value = e.target.value;
            const formatted = formatCEP(value);
            e.target.value = formatted;
            currentCEP = cleanCEP(formatted);

            if (currentCEP.length === 8) {
                if (isValidCEP(currentCEP)) {
                    inputElement.classList.remove('cep-invalid');
                    inputElement.classList.add('cep-valid');
                    
                    if (onValid) {
                        onValid(currentCEP);
                    }

                    if (onFetch) {
                        fetchCEPInfo(currentCEP).then(data => {
                            if (data) {
                                onFetch(data);
                            }
                        });
                    }

                    if (showShipping && shippingContainer) {
                        const shippingOptions = calculateShipping(currentCEP);
                        if (shippingOptions) {
                            displayShippingOptions(shippingOptions, shippingContainer);
                        }
                    }
                } else {
                    inputElement.classList.remove('cep-valid');
                    inputElement.classList.add('cep-invalid');
                    if (onInvalid) {
                        onInvalid(currentCEP);
                    }
                }
            } else {
                inputElement.classList.remove('cep-valid', 'cep-invalid');
                if (shippingContainer) {
                    shippingContainer.innerHTML = '';
                }
            }
        });

        inputElement.addEventListener('blur', function(e) {
            const value = cleanCEP(e.target.value);
            if (value.length > 0 && value.length < 8) {
                inputElement.classList.add('cep-invalid');
                if (onInvalid) {
                    onInvalid(value);
                }
            }
        });
    }

    function displayShippingOptions(options, container) {
        container.innerHTML = '';

        const isProductPage = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() !== '';
        const borderColor = isProductPage ? 'var(--border)' : '#e0e0e0';
        const hoverBorderColor = isProductPage ? 'var(--accent)' : '#0f6efd';
        const hoverBgColor = isProductPage ? 'var(--surface-2)' : '#f8f9fa';
        const selectedBgColor = isProductPage ? 'rgba(15,110,253,0.08)' : '#e8f0fe';
        const textColor = isProductPage ? 'var(--ink)' : '#333';
        const mutedColor = isProductPage ? 'var(--muted)' : '#666';
        const muted2Color = isProductPage ? 'var(--muted-2)' : '#999';

        options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'shipping-option';
            optionDiv.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px;
                margin-bottom: 10px;
                border: 1px solid ${borderColor};
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: ${isProductPage ? 'var(--surface-2)' : 'transparent'};
            `;

            optionDiv.innerHTML = `
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 4px; color: ${textColor}; font-size: 15px;">${option.name}</div>
                    <div style="font-size: 13px; color: ${mutedColor}; margin-bottom: 2px;">${option.description}</div>
                    <div style="font-size: 12px; color: ${muted2Color};">${option.days}</div>
                </div>
                <div style="font-weight: 700; font-size: 18px; color: ${option.free ? '#28a745' : textColor};">
                    ${option.free ? 'Grátis' : 'R$ ' + option.price.toFixed(2).replace('.', ',')}
                </div>
            `;

            optionDiv.addEventListener('mouseenter', function() {
                this.style.borderColor = hoverBorderColor;
                this.style.backgroundColor = hoverBgColor;
                this.style.transform = 'translateY(-1px)';
                this.style.boxShadow = isProductPage ? 'var(--elev-soft)' : '0 2px 8px rgba(0,0,0,0.1)';
            });

            optionDiv.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.borderColor = borderColor;
                    this.style.backgroundColor = isProductPage ? 'var(--surface-2)' : 'transparent';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                }
            });

            optionDiv.addEventListener('click', function() {
                container.querySelectorAll('.shipping-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.style.borderColor = borderColor;
                    opt.style.backgroundColor = isProductPage ? 'var(--surface-2)' : 'transparent';
                    opt.style.borderWidth = '1px';
                    opt.style.transform = 'translateY(0)';
                    opt.style.boxShadow = 'none';
                });

                this.classList.add('selected');
                this.style.borderColor = hoverBorderColor;
                this.style.backgroundColor = selectedBgColor;
                this.style.borderWidth = '2px';
                this.style.boxShadow = isProductPage ? 'var(--elev-soft)' : '0 2px 8px rgba(0,0,0,0.1)';

                const event = new CustomEvent('shippingSelected', {
                    detail: option
                });
                container.dispatchEvent(event);
            });

            container.appendChild(optionDiv);
        });
    }

    window.CEPValidator = {
        clean: cleanCEP,
        format: formatCEP,
        isValid: isValidCEP,
        fetch: fetchCEPInfo,
        calculateShipping: calculateShipping,
        init: initCEPInput,
        displayShipping: displayShippingOptions
    };
})();


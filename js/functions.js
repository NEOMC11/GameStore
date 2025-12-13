const stickersConfig = {
    "1": "./img/stikers/1.jpeg",
    "heart": "./img/stikers/heart.png",
    "pollo": "./img/stikers/pollo.png",
    "fire": "./img/stikers/fire.gif",
    "minecraft": "./img/stikers/minecraft.png",
    "axolotl": "./img/stikers/axolotl.png",
    "frog": "./img/stikers/frog.gif",
    "happy-ghast": "./img/stikers/happy-ghast.png",
    "chestnut": "./img/stikers/chestnut.png",
    "think": "./img/stikers/think.gif",
    "sad": "./img/stikers/sad.gif",
    "eyeroll": "./img/stikers/eyeroll.gif"
};

let activeStickerPicker = null;

function processStickers(text) {
    if (!text) return '';
    
    const stickerRegex = /\$([a-zA-Z0-9]+)/g;
    
    return text.replace(stickerRegex, (match, stickerId) => {
        const stickerUrl = stickersConfig[stickerId];
        if (stickerUrl) {
            return `<img src="${stickerUrl}" alt="Sticker ${stickerId}" class="custom-sticker" data-sticker="${stickerId}">`;
        }
        return match;
    });
}

function processStickersInTitles(text) {
    if (!text) return '';
    
    const stickerRegex = /\$([a-zA-Z0-9]+)/g;
    
    return text.replace(stickerRegex, (match, stickerId) => {
        const stickerUrl = stickersConfig[stickerId];
        if (stickerUrl) {
            return `<img src="${stickerUrl}" alt="Sticker ${stickerId}" class="custom-sticker title-sticker" data-sticker="${stickerId}">`;
        }
        return match;
    });
}

function getAvailableStickers() {
    return Object.keys(stickersConfig).map(key => ({
        code: `$${key}`,
        url: stickersConfig[key],
        preview: stickersConfig[key]
    }));
}

function addStickerToText(textarea, stickerCode) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const sticker = ` ${stickerCode} `;
    
    textarea.value = text.substring(0, start) + sticker + text.substring(end);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = start + sticker.length;
    
    const event = new Event('input', { bubbles: true });
    textarea.dispatchEvent(event);
    
    closeStickerPicker();
}

function createStickerPicker(textareaId) {
    const stickers = getAvailableStickers();
    const container = document.createElement('div');
    container.className = 'sticker-picker';
    container.id = `sticker-picker-${textareaId}`;
    
    const pickerHeader = document.createElement('div');
    pickerHeader.className = 'sticker-picker-header';
    pickerHeader.innerHTML = '<h4>Stickers Disponibles</h4>';
    container.appendChild(pickerHeader);
    
    const stickersGrid = document.createElement('div');
    stickersGrid.className = 'stickers-grid';
    
    stickers.forEach(sticker => {
        const stickerItem = document.createElement('div');
        stickerItem.className = 'sticker-item';
        stickerItem.innerHTML = `
            <img src="${sticker.preview}" alt="${sticker.code}" class="sticker-preview">
            <span class="sticker-code">${sticker.code}</span>
        `;
        
        stickerItem.addEventListener('click', () => {
            const textarea = document.getElementById(textareaId);
            if (textarea) {
                addStickerToText(textarea, sticker.code);
            }
        });
        
        stickersGrid.appendChild(stickerItem);
    });
    
    container.appendChild(stickersGrid);
    
    container.addEventListener('scroll', function() {});
    
    return container;
}

function showStickerPicker(textareaId) {
    closeStickerPicker();
    
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    const parent = textarea.parentElement;
    const picker = createStickerPicker(textareaId);
    parent.appendChild(picker);
    
    activeStickerPicker = {
        element: picker,
        textareaId: textareaId
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeStickerPickerOnClickOutside);
    }, 10);
}

function closeStickerPicker() {
    if (activeStickerPicker) {
        activeStickerPicker.element.remove();
        activeStickerPicker = null;
        document.removeEventListener('click', closeStickerPickerOnClickOutside);
    }
}

function closeStickerPickerOnClickOutside(event) {
    if (activeStickerPicker && !activeStickerPicker.element.contains(event.target)) {
        const stickerButton = document.querySelector('.sticker-picker-toggle');
        if (!stickerButton || !stickerButton.contains(event.target)) {
            closeStickerPicker();
        }
    }
}

function toggleStickerPicker(textareaId) {
    if (activeStickerPicker && activeStickerPicker.textareaId === textareaId) {
        closeStickerPicker();
    } else {
        showStickerPicker(textareaId);
    }
}

function initStickersForElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (element.innerHTML) {
        if (element.classList.contains('addon-title') || element.classList.contains('page-title')) {
            element.innerHTML = processStickersInTitles(element.innerHTML);
        } else {
            element.innerHTML = processStickers(element.innerHTML);
        }
    }
    
    if (element.tagName === 'TEXTAREA') {
        const parent = element.parentElement;
        if (parent && !parent.querySelector('.sticker-picker-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'sticker-picker-toggle';
            toggleBtn.innerHTML = '😊 Añadir Sticker';
            toggleBtn.title = 'Añadir sticker';
            
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleStickerPicker(elementId);
            });
            
            parent.style.position = 'relative';
            parent.appendChild(toggleBtn);
        }
    }
}

function processAllStickers() {
    const elements = document.querySelectorAll('.sticker-content, .addon-description, .review-comment, .user-review-comment');
    
    elements.forEach(element => {
        if (element.innerHTML && !element.classList.contains('sticker-processed')) {
            element.innerHTML = processStickers(element.innerHTML);
            element.classList.add('sticker-processed');
        }
    });
    
    const titleElements = document.querySelectorAll('.addon-title, .page-title');
    
    titleElements.forEach(element => {
        if (element.innerHTML && !element.classList.contains('sticker-processed')) {
            element.innerHTML = processStickersInTitles(element.innerHTML);
            element.classList.add('sticker-processed');
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activeStickerPicker) {
        closeStickerPicker();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    processAllStickers();
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                processAllStickers();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

window.StickerSystem = {
    processStickers,
    processStickersInTitles,
    getAvailableStickers,
    addStickerToText,
    createStickerPicker,
    showStickerPicker,
    closeStickerPicker,
    toggleStickerPicker,
    initStickersForElement,
    processAllStickers
};
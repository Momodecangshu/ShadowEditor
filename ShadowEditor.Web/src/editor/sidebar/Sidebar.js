﻿import UI from '../../ui/UI';
import PropertyPanel from './PropertyPanel';
import AnimationPanel from './AnimationPanel';
import HistoryPanel from './HistoryPanel';

/**
 * 侧边栏
 * @author mrdoob / http://mrdoob.com/
 * @author tengge / https://github.com/tengge1
 */
function Sidebar(options) {
    UI.Control.call(this, options);
    app = options.app;
};

Sidebar.prototype = Object.create(UI.Control.prototype);
Sidebar.prototype.constructor = Sidebar;

Sidebar.prototype.render = function () {
    var data = {
        xtype: 'div',
        parent: this.parent,
        cls: 'sidebar rsidebar',
        children: [{
            xtype: 'div',
            cls: 'tabs',
            style: {
                position: 'sticky',
                top: 0,
                zIndex: 10
            },
            children: [{
                xtype: 'text',
                id: 'propertyTab',
                scope: this.id,
                text: L_PROPERTY,
                onClick: () => {
                    app.call('tabSelected', this, 'property');
                }
            }, {
                xtype: 'text',
                id: 'animationTab',
                scope: this.id,
                text: L_ANIMATION,
                onClick: () => {
                    app.call('tabSelected', this, 'animation');
                }
            }, {
                xtype: 'text',
                id: 'historyTab',
                scope: this.id,
                text: L_HISTORY,
                onClick: () => {
                    app.call('tabSelected', this, 'history');
                }
            }]
        }, {
            xtype: 'div',
            id: 'propertyPanel',
            scope: this.id,
            children: [
                new PropertyPanel({ app: app })
            ]
        }, {
            xtype: 'div',
            id: 'animationPanel',
            scope: this.id,
            children: [
                new AnimationPanel({ app: app })
            ]
        }, {
            xtype: 'div',
            id: 'historyPanel',
            scope: this.id,
            children: [
                new HistoryPanel({ app: app })
            ]
        }]
    };

    var control = UI.create(data);
    control.render();

    app.on(`appStarted.${this.id}`, this.onAppStarted.bind(this));
    app.on(`tabSelected.${this.id}`, this.onTabSelected.bind(this));
};

Sidebar.prototype.onAppStarted = function () {
    app.call('tabSelected', this, 'property');
};

Sidebar.prototype.onTabSelected = function (tabName) {
    var tabNames = [
        'property',
        'animation',
        'history'
    ];
    if (tabNames.indexOf(tabName) === -1) {
        return;
    }

    var propertyTab = UI.get('propertyTab', this.id);
    var animationTab = UI.get('animationTab', this.id);
    var historyTab = UI.get('historyTab', this.id);

    var propertyPanel = UI.get('propertyPanel', this.id);
    var animationPanel = UI.get('animationPanel', this.id);
    var historyPanel = UI.get('historyPanel', this.id);

    propertyTab.dom.className = '';
    animationTab.dom.className = '';
    historyTab.dom.className = '';

    propertyPanel.dom.style.display = 'none';
    animationPanel.dom.style.display = 'none';
    historyPanel.dom.style.display = 'none';

    switch (tabName) {
        case 'property':
            propertyTab.dom.className = 'selected';
            propertyPanel.dom.style.display = '';
            break;
        case 'animation':
            animationTab.dom.className = 'selected';
            animationPanel.dom.style.display = '';
            break;
        case 'history':
            historyTab.dom.className = 'selected';
            historyPanel.dom.style.display = '';
            break;
    }
};

export default Sidebar;
import Vue from 'vue';
import {
    humanize
} from 'underscore.string';
import {
    isEmpty,
    orderBy,
    flattenDeep,
} from 'lodash';
// import store from '@state';
// import api from './api';

const service = {
    arrayToObject(array) {
        const mapped = array.map(value => ({
            name: humanize(value),
            value,
        }));
        return [...mapped];
    },
    // async updateLoggedInUser(item) {
    //     const data = lodash.cloneDeep(item);
    //     const userId = store.getters['account/getUserId'];
    //     delete data.email;
    //     delete data.roleId;

    //     await api.updateById('user', userId, data);

    //     store.dispatch('account/update', data);
    //     return Promise.resolve(null);
    // },
    // redirectToHttps() {
    //     const loc = `${window.location.href} `;
    //     if (loc.indexOf('http://') === 0 && process.env.VUE_APP_NODE_ENV === 'production') {
    //         console.log('redirection', process.env.VUE_APP_NODE_ENV);
    //         window.location.href = loc.replace('http://', 'https://');
    //     }
    // },
    downloadFile(url, fileName = '') {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    // goToPage(name = 'home', data = {}, type = 'params') {
    //     const obj = {
    //         name
    //     };
    //     if (!isEmpty(data)) obj[type] = data;
    //     Vue.router.push(obj);
    // },
    redirectToLink(url) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    getRoleRoutes() {
        const list = [
            {
                name: 'Manage Question Category (BD Management)',
                value: 'bd.category.list',
            },
            {
                name: 'Manage Project (BD Management)',
                value: 'bd.survey.list'
            },
            {
                name: 'Manage Question (BD Management)',
                value: 'bd.question.list',
            },
            {
                name: 'Project Status (BD Management)',
                value: 'bd.survey.status.list', 
            },
            {
                name: 'New / Renew Contract (Contact Management)',
                value: 'contract.create',
            },
            {
                name: 'Manage Template (Contact Management)',
                value: 'template.create'
            },
            {
                name: 'Contract History (Contact Management)',
                value: 'contract.history',
            },
            {
                name: 'Manange User (User Management)',
                value: 'user.list', 
            },
            {
                name: 'Manange Log (User Management)',
                value: 'logs.list'
            },
            {
                name: 'Manange Role (User Management)',
                value: 'role.list',
            },
            {
                name: 'Manage Vendor (Vendor Management)',
                value: 'vendor.list'
            },
        ];
        return list;
    },
    getApplicationMethods() {
        const items = [{
            name: 'Manual',
            value: 'manual'
        }, {
            name: 'Apply to Oldest',
            value: 'apply_to_oldest'
        }];
        return items;
    },
    getGeneralBusPostingGroups() {
        const items = [{
            name: 'MAIN STORE',
            value: 'main_store'
        }];
        return items;
    },
    getVatBusPostingGroups() {
        const items = [{
            name: 'VAT',
            value: 'vat'
        }];
        return items;
    },
    getYesNoOption() {
        const items = [{
            name: 'Yes',
            value: 'true'
        }, {
            name: 'No',
            value: 'false'
        }];
        return items;
    },
    getGSTVendorType() {
        const items = [{
            name: 'Registered',
            value: 'registered'
        }, {
            name: 'Non-Registered',
            value: 'non_registered'
        }];
        return items;
    },
    getDocumentTypes() {
        const items = [{
            name: 'PAN',
            value: 'pan'
        }, {
            name: 'CANCEL CHEQUE',
            value: 'cancel_cheque'
        }, {
            name: 'GST ACK. COPY',
            value: 'gst_ack_copy'
        }, {
            name: 'OTHERS',
            value: 'other'
        }];
        return items;
    },
    parseSiteLocation(responses) {
        let locationResponses = responses.filter(r => r.question_category.name === "location");

        locationResponses = locationResponses.filter(
            r => !["coordinates", "site_coordinates"].includes(r.question.answerType),
        );
        locationResponses = orderBy(locationResponses, ["question.order"], ["asc"]);

        let address = locationResponses.map(r => r.response);

        address = flattenDeep(address);

        // return address && address.length) ? address[0] : '';
        return address.join(",");
    },
    parseSiteRegion(responses){
        let locationResponses = responses.filter(r => r.question_category.name === 'location');

        if(locationResponses && locationResponses.length){
            const res = locationResponses.find(r => r.question.label === "Region");
            if(res) return res.response && res.response.length ? res.response[0] : '';
        }
        return '';
    }
};

// Bind Utilities to Vue$
// Vue.$http = service;
// Object.defineProperty(Vue.prototype, '$utility', {
//     get() {
//         return service;
//     },
// });

export default service;
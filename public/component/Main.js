/**
 *
 * Created by my on 9/13/16.
 */
//var Sidebar = require('Sidebar');
var ListMenu = require('./ListMenu');
var dataList = require('../../models/item_test').items;
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
    <ListMenu data={dataList}></ListMenu>,
    document.getElementById('ex')
);
<?php
/*==============================================================================
 *  Title      : Site Controller
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 03.10.2015
 *==============================================================================
 */

/**
 * Very simple site controller
 * 
 * It's just a mock controller for first time start with the digger\\application\\Starter
 *
 * @version 1.0
 * @author Digger <mrdigger@sad-systems.ru>
 * @copyright (c) 2015, SAD-Systems
 */
class SiteController {
    
    //--- Layout:
    public $layout        = 'main';
    //--- Default Action:
    //public $defaultAction = 'index';
    
    /**
     * Simple action
     * 
     * @return string Name of View
     */
    public function actionIndex() { return 'landing'; }
    
}

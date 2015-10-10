<?php
/*==============================================================================
 *  Title      : Simple Class Loader
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 03.10.2015
 *==============================================================================
 */
namespace digger\cradle\common;
/**
 * @brief Digger Class Loader
 * 
 * Spesial auto loader for all Digger components
 *
 * @version 3.0
 * @author Digger <mrdigger@sad-systems.ru>
 * @copyright (c) 2015, SAD-Systems
 * 
 * @todo How to use:
 * @code
 * 
 * require_once 'ClassLoader.php';
 * 
 * digger\cradle\common\ClassLoader::register('/application/root', ['lib', 'controllers', 'models']);
 * 
 * @endcode
 */
class ClassLoader {

    /**
     * Root path to search classes
     * @var string 
     */
    public static $rootPath = null;

    /**
     * Search list to find classes in specific directories
     * @var type array
     */
    public  static $searchList = ['lib', 'controllers', 'models'];
    
    private static $_loaderAlreadyRegistred = false;
    
    /**
     * function to register Digger's autoLoader
     * 
     * @param string $rootPath Root path to start search the classes
     */
    public static function register($rootPath, $searchList = null)
    {
        self::$rootPath = $rootPath;
        if ($searchList!==null) { self::$searchList = $searchList; }
        if (!self::$_loaderAlreadyRegistred) {
            spl_autoload_register(array(__CLASS__, 'load'));
            self::$_loaderAlreadyRegistred = true; // echo "Digger's loader is registred!\n";
        }
    }
    
    /**
     * Function to load a class
     * 
     * @param  string  $class   Class name for class to load.
     * @return boolean          TRUE on success.
     */
    public static function load( $class )
    {
        $class = str_replace("\\", '/', $class);
        if (!self::$searchList)           { self::$searchList = ['']; }
        if (!is_array(self::$searchList)) { self::$searchList = [self::$searchList]; }
        foreach (self::$searchList as $path) {
            if ($path) { $path .= '/'; }
            $fileName = self::$rootPath . '/' . $path . $class . ".php";
            if (is_file($fileName)) {
                require_once $fileName;
                return true;
            }
        }
        
    return false;
    }
}
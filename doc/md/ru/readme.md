# Startap - Web Start Application

> Каркас для создания веб приложения основанного на архитектуре MVC.

##Включает в себя:

* Структуру каталогов
* Шаблоны конфигурационных файлов для [NodeJS](https://nodejs.org/), [Bower](http://bower.io) и [Composer](https://getcomposer.org) (а так же средства для их автоматической генерации и обновления)
* Средства автоматизированного документирования кода на основе [Doxygen](http://www.stack.nl/~dimitri/doxygen) и [JsDoc](http://usejsdoc.org)
* Средства автоматизированного тестирования кода на основе [PhpUnit](https://phpunit.de)
* Шаблон "Front-end" части, ориентированной на использование предкомпилятора Sass и библиотек: 
    - [bootstrap](http://getbootstrap.com)
    - [jquery](http://jquery.com)
    - [underscore](http://underscorejs.org)
    - [backbone](http://backbonejs.org)
* Микро фреймворк для первого демонстрационного запуска данного каркаса и поддержки его сценариев автоматизации

Данный каркас ориентирован на использование [Yii2](http://www.yiiframework.com) в качестве серверного (back-end) фреймворка, однако совершенно от него не зависит и может быть использован с любым другим.

##Предварительные требования

Перед тем как приступить к установке, необходимо установить:

* [PHP](http://php.net/downloads.php). Средства автоматизации и минифреймворк в данном каркасе используют PHP версии 5.4.
* [NodeJS](https://nodejs.org/en/download/). Большая часть копонентов для веб разработки в данном каркасе устанавливается при помощи [npm](https://www.npmjs.com).
* [Doxygen](http://www.stack.nl/~dimitri/doxygen/download.html). Стандартное средство документирования кода.

Остальные требуемые компонеты устанавливаются самим каркасом.

##Установка

Просто клонируйте репозиторий: `git clone https://github.com/sad-systems/startap.git`

##С чего начать

###Шаг 1 
Отредактируйте конфигурационный файл: [config/description.php](/config/description.php)

Укажите всю необходимую информацию о вашем новом приложении (она потребуется для автоматического создания конфигураций   [npm](https://docs.npmjs.com/files/package.json), [bower](http://bower.io/docs/creating-packages/),  [composer](https://getcomposer.org/doc/01-basic-usage.md) и вашего приложения):

~~~php
    'title'       => 'Название вашего приложения',
    'description' => 'Краткое описание вашего приложения (если требеутся)',
    'version'     => '1.0.0', // версия
    'logo'        => '',      // ссылка на картинку
    'author'      => [
             'name' => 'Имя автора приложения',
            'email' => 'автор@...',
         'homepage' => 'http://...домашняя страница автора...',
             'role' => 'Роль автора',
~~~

###Шаг 2
Перейдите в каталог `automations` и из командной строки запустите:

~~~sh
$ ./init
~~~

> Файл `init` должен быть с правами на исполнение

После этого в корне вашего нового приложения появятся все необходимые конфигурационные файлы (`package.json`, `bower.json`, `composer.json`) для установки компонентов, а в каталоге `config` добавятся конфигурации `doxygen.cfg` и `jsdoc-conf.json` для настройки генераторов документации. Помимо стандартных настроек, в этих файлах будет содержаться информация, которую вы указали в `config/description.php`.
> `init` создаёт файлы только если они не существуют. Для пересоздания файлов сначала удалите старые.

###Шаг 3
Настройте полученные в `Шаге 2.` конфигурационные файлы в соответствии вашим требованиям.

###Шаг 4
Перейдите в каталог `automations` и из командной строки запустите:

~~~sh
$ ./update all
~~~

> Файл `update` должен быть с правами на исполнение.

На этом этапе автоматические установщики пакетов ([NodeJS](https://nodejs.org/), [Bower](http://bower.io) и [Composer](https://getcomposer.org)) загрузят всё необходимое в соответсвии с указанными вами требовниями.

###Шаг 5 

<b>Создавайте своё приложение!</b>

#### Документирование

Если вам потребуется создать документацию для своего приложения, просто запустите из каталога `automations` команду:  

~~~sh
$ ./docs
~~~

> Файл `docs` должен быть с правами на исполнение.

Вся автоматически сгенерированная документация будет располагаться в каталоге `doc`.

#### Тестирование

Если вам потребуется создать скелеты тестов для своего приложения, просто запустите из каталога `automations` команду:  

~~~sh
$ ./gentests
~~~

> Файл `gentests` должен быть с правами на исполнение.

> При повторном запуске `gentests` создаёт только ещё несуществующие тесты, аккуратно добавляя их к уже созданным ранее.

Скелеты сгенерированных тестов буду располагаться в каталоге `tests`. Запустить автоматическую проверку тестов можно командой (из каталога `automations`): 

~~~sh
$ ./runtests
~~~

При этом просмотреть отчёт о выполнении тестов можно будет открыв в браузере файл: `tests/index.php`

#### Сборка

Для сборки приложения запустите из каталога `automations` команду:  

~~~sh
$ ./build
~~~

> Файл `build` должен быть с правами на исполнение.

или из корня приложения команду:

~~~sh
$ ./gulp
~~~

Более подробно о запуске данных команд можно узнать в разделе [Структура каркаса](structure.md#automations). 

## Структура каркаса

[Описание структуры](structure.md)

## Авторы

[Mr Digger](mailto://mrdigger@mail.ru)

## Авторские права

Авторские права на код и документацию 2015 [SAD-Systems](http://sad-systems.ru) 

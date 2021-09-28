<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit983ca05a39e418a3caf4f4eb079a707d
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit983ca05a39e418a3caf4f4eb079a707d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit983ca05a39e418a3caf4f4eb079a707d::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}

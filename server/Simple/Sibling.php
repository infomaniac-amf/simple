<?php
namespace Simple;

use Infomaniac\AMF\ISerializable;

class Sibling implements ISerializable
{
    public $name;
    public $user;

    /**
     * Return an associative array of class properties
     *
     * @return array
     */
    public function export()
    {
        return array(
            'name' => $this->name,
            'user' => $this->user
        );
    }

    /**
     * Import data from an external source into this class
     *
     * @param $data mixed
     */
    public function import($data)
    {
        if(empty($data)) {
            return;
        }

        foreach($data as $key => $value) {
            $this->$key = $value;
        }
    }
}
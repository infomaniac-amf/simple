<?php
namespace Simple;

use Infomaniac\AMF\ISerializable;

class User implements ISerializable
{
    public $firstName;
    public $lastName;
    public $emailAddress;
    public $password;
    public $spamMe;
    public $gender;
    public $birthday;

    public $siblings;

    /**
     * Return an associative array of class properties
     *
     * @return array
     */
    public function export()
    {
        return array(
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'emailAddress' => $this->emailAddress,
            'spamMe' => $this->spamMe,
            'gender' => $this->gender,
            'birthday' => $this->birthday,

            'siblings' => $this->siblings,
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
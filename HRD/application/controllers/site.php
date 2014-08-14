<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Site extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }
    // function index()
    // {
    //     $this->load->view('authlogin');
    // }

    function user_area()
    {
    	if($this->session->userdata('logged_in') == true)
        {
            // $data['user'] = $this->session->userdata('username');
            // $this->load->view('dashboard',$data);
            $this->load->view('dashboard');
        }
        else
        {
            $this->load->view('authlogin');
        }

    }
}
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class C_attendance extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library(array('Classes/PHPExcel','Classes/PHPExcel/IOFactory'));
	}

	function upload(){
		
		$fileName 					= $_FILES['csvfile']['name'];
		$config['upload_path']		= './upload/file';
		$config['file_name']		= $fileName;
		$config['allowed_types']	= '*';
		$config['max_size']			= 10000;
		$date 						= $this->input->post('dateatt');
		$csvfile 					= $this->input->post('csvfile');

		$this->load->library('upload',$config);
		$this->upload->initialize($config);

		if(! $this->upload->do_upload('csvfile'))
			$this->upload->display_errors();
		
		$media 			= $this->upload->data('csvfile');
		$inputFileName	= $media['full_path'];
		// $inputFileName	= './upload/file/'.$media['file_name'];
		//var_dump(file_get_contents($inputFileName));
		//var_dump(file_get_contents($media['full_path']));
		// exit();

		try {
			$inputFileType 	= IOFactory::identify($inputFileName);
			$objReader 		= IOFactory::createReader($inputFileType);
			$objPHPExcel 	= $objReader->load($inputFileName); 
		} catch (Exception $e){
			 die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}

		//  Get worksheet dimensions
		$sheet 			= $objPHPExcel->getSheet(0);
		$highestRow 	= $sheet->getHighestRow();
		$highestColumn 	= $sheet->getHighestColumn();

		 //  Loop through each row of the worksheet in turn
        for ($row = 2; $row <= $highestRow; $row++){                  //  Read a row of data into an array                 
            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);

            //  Insert row data array into your database of choice here
            $data = array(
                        "code"=> $rowData[0][7],
                        "date"=> $date,
                        "time"=> $rowData[0][1]
                    );
           	if($this->db->insert('temp_attendance', $data)){
           		$success = 1;
           	} else {
           		$success = 2;
           	}
       }
       $data['total'] 	= $success;
       $data['success'] = TRUE;
       echo json_encode($data);
    }			
}
<?php

namespace Drupal\tc_webform\Controller;

use \Drupal\Core\Controller\ControllerBase;

/**
 * Class TCWebformConfirmation
 *
 * @package Drupal\tc_webform\Controller
 */
class TCWebformConfirmation extends ControllerBase {

  public function render($webform_submission_token) {

    if (!empty($webform_submission_token)) {
      $webform = \Drupal::entityTypeManager()
        ->getStorage('webform_submission')
        ->loadByProperties(['token' => $webform_submission_token]);
      $content = $this->processedContent($webform);
      $ff = 0;
    }
    else {
      $content = 'WELL ODNE!';
    }

    return [
      '#theme' => 'tc-webform-result',
      '#content' => $content,
    ];
  }


  private function processedContent($webform) {
    $webform = array_shift($webform);
    $webform_data = $webform->getData();
    $ff = 0;

    return [
      'tithe_percentage' => $webform_data['tithe_percentage'],
      'frequency' => $webform_data['how_often_do_you_get_paid'],
      'income' => $webform_data['how_much_do_you_get_paid'],
      'weekly_tithe' => '',
      'monthly_tithe' => '',
      'yearly_tithe' => '',
    ];
  }

  private function titheCalculations($tithe_percentage, $income) {
    if (!empty($tithe_percentage) && !empty($income)) {

    }
  }
}



/**
 * @file
 * Omega TC Theme JS functionality.
 */
(function ($) {
  "use strict";

  Drupal.behaviors.tc = {
    /**
     * Attach method for this behavior.
     *
     * @param context
     *   The context for which the behavior is being executed. This is either
     *   the full page or a piece of HTML that was just added through Ajax.
     * @param settings
     *   An array of settings (added through drupal_add_js()). Instead of
     *   accessing Drupal.settings directly you should use this because of
     *   potential modifications made by the Ajax callback that also produced
     *   'context'.
     */
    attach: function (context, settings) {
      var self = this;

      self.styleSelectElements(context, settings);

    },
    /**
     * Adding functionality for custom select elements.
     */
    styleSelectElements: function (context, settings) {
      $('select', context).each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
          'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
          }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
          e.stopPropagation();
          $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
          e.stopPropagation();
          $styledSelect.text($(this).text()).removeClass('active');
          $this.val($(this).attr('rel'));
          $list.hide();
          //console.log($this.val());
        });

        $(document).click(function() {
          $styledSelect.removeClass('active');
          $list.hide();
        });

      });
    },
  }
})(jQuery);

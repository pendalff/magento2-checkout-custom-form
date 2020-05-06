<?php
/**
 * Checkout custom fields interface
 *
 * @package   Bodak\CheckoutCustomForm
 * @author    Slawomir Bodak <slawek.bodak@gmail.com>
 * @copyright © 2017 Slawomir Bodak
 * @license   See LICENSE file for license details.
 */

declare(strict_types=1);

namespace Bodak\CheckoutCustomForm\Api\Data;

/**
 * Interface CustomFieldsInterface
 *
 * @category Api/Data/Interface
 * @package  Bodak\CheckoutCustomForm\Api\Data
 */
interface CustomFieldsInterface
{
    const CHECKOUT_GA = 'checkout_ga_track';
    /**
     * Get checkout GA track
     *
     * @return string|null
     */
    public function getCheckoutGaTrack();

    /**
     * Set checkout GA track
     *
     * @param string|null $checkoutGa GA track string
     *
     * @return CustomFieldsInterface
     */
    public function setCheckoutGaTrack(string $checkoutGa = null);
}

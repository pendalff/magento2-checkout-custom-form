<?php
/**
 * @package   Bodak\CheckoutCustomForm
 * @author    Slawomir Bodak <slawek.bodak@gmail.com>
 * @copyright © 2017 Slawomir Bodak
 * @license   See LICENSE file for license details.
 */

declare(strict_types=1);

namespace Bodak\CheckoutCustomForm\Model\Data;

use Magento\Framework\Api\AbstractExtensibleObject;
use Bodak\CheckoutCustomForm\Api\Data\CustomFieldsInterface;

/**
 * Class CustomFields
 *
 * @category Model/Data
 * @package  Bodak\CheckoutCustomForm\Model\Data
 */
class CustomFields extends AbstractExtensibleObject implements CustomFieldsInterface
{
    /**
     * @return string|null
     */
    public function getCheckoutGaTrack()
    {
        return $this->_get(static::CHECKOUT_GA);
    }

    /**
     * @param string|null $checkoutGa
     * @return CustomFieldsInterface
     */
    public function setCheckoutGaTrack(string $checkoutGa = null)
    {
        return $this->setData(static::CHECKOUT_GA, $checkoutGa);
    }

}

package output

type PublicProductListItem struct {
	ID          uint64  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	BasePrice   float64 `json:"base_price"`
	MainImage   *string `json:"main_image,omitempty"`
}

type GetPublicProductsResponse struct {
	Products []PublicProductListItem `json:"products"`
}

type PublicProductTag struct {
	Name string  `json:"name"`
	Slug *string `json:"slug,omitempty"`
}

type PublicProductImage struct {
	URL           string  `json:"url"`
	AltText       *string `json:"alt_text,omitempty"`
	OptionValueID *uint64 `json:"option_value_id,omitempty"`
	IsPrimary     bool    `json:"is_primary"`
}

type PublicProductVariant struct {
	VariantID  uint64               `json:"variant_id"`
	ProductID  uint64               `json:"product_id"`
	SKUCode    string               `json:"sku_code"`
	Price      float64              `json:"price"`
	Inventory  int32                `json:"inventory"`
	Color      *string              `json:"color,omitempty"`
	ColorValue *string              `json:"color_value,omitempty"`
	Size       *string              `json:"size,omitempty"`
	SizeValue  *string              `json:"size_value,omitempty"`
	Images     []PublicProductImage `json:"images"`
}

type PublicProductDetail struct {
	ID          uint64                 `json:"id"`
	Name        string                 `json:"name"`
	Description *string                `json:"description,omitempty"`
	Price       float64                `json:"price"`
	Tags        []PublicProductTag     `json:"tags,omitempty"`
	Images      []PublicProductImage   `json:"images"`
	Colors      []string               `json:"colors"`
	Sizes       []string               `json:"sizes"`
	Variants    []PublicProductVariant `json:"variants"`
}

type GetPublicProductResponse struct {
	Product *PublicProductDetail `json:"product,omitempty"`
}
package output

type PublicProductListItem struct {
	ID          uint64  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	BasePrice   float64 `json:"base_price"`
	MainImage   *string `json:"main_image,omitempty"`
}

type GetPublicProductsResponse struct {
	Products []PublicProductListItem `json:"products"`
}

type PublicProductTag struct {
	Name string  `json:"name"`
	Slug *string `json:"slug,omitempty"`
}

type PublicProductImage struct {
	URL           string  `json:"url"`
	AltText       *string `json:"alt_text,omitempty"`
	OptionValueID *uint64 `json:"option_value_id,omitempty"`
	IsPrimary     bool    `json:"is_primary"`
}

type PublicProductVariant struct {
	VariantID  uint64               `json:"variant_id"`
	ProductID  uint64               `json:"product_id"`
	SKUCode    string               `json:"sku_code"`
	Price      float64              `json:"price"`
	Inventory  int32                `json:"inventory"`
	Color      *string              `json:"color,omitempty"`
	ColorValue *string              `json:"color_value,omitempty"`
	Size       *string              `json:"size,omitempty"`
	SizeValue  *string              `json:"size_value,omitempty"`
	Images     []PublicProductImage `json:"images"`
}

type PublicProductDetail struct {
	ID          uint64                 `json:"id"`
	Name        string                 `json:"name"`
	Description *string                `json:"description,omitempty"`
	Price       float64                `json:"price"`
	Tags        []PublicProductTag     `json:"tags,omitempty"`
	Images      []PublicProductImage   `json:"images"`
	Colors      []string               `json:"colors"`
	Sizes       []string               `json:"sizes"`
	Variants    []PublicProductVariant `json:"variants"`
}

type GetPublicProductResponse struct {
	Product *PublicProductDetail `json:"product,omitempty"`
}
package output

type PublicProductListItem struct {
	ID          uint64  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	BasePrice   float64 `json:"base_price"`
	MainImage   *string `json:"main_image,omitempty"`
}

type GetPublicProductsResponse struct {
	Products []PublicProductListItem `json:"products"`
}

type PublicProductTag struct {
	Name string  `json:"name"`
	Slug *string `json:"slug,omitempty"`
}

type PublicProductImage struct {
	URL           string  `json:"url"`
	AltText       *string `json:"alt_text,omitempty"`
	OptionValueID *uint64 `json:"option_value_id,omitempty"`
	IsPrimary     bool    `json:"is_primary"`
}

type PublicProductVariant struct {
	VariantID  uint64               `json:"variant_id"`
	ProductID  uint64               `json:"product_id"`
	SKUCode    string               `json:"sku_code"`
	Price      float64              `json:"price"`
	Inventory  int32                `json:"inventory"`
	Color      *string              `json:"color,omitempty"`
	ColorValue *string              `json:"color_value,omitempty"`
	Size       *string              `json:"size,omitempty"`
	SizeValue  *string              `json:"size_value,omitempty"`
	Images     []PublicProductImage `json:"images"`
}

type PublicProductDetail struct {
	ID          uint64                 `json:"id"`
	Name        string                 `json:"name"`
	Description *string                `json:"description,omitempty"`
	Price       float64                `json:"price"`
	Tags        []PublicProductTag     `json:"tags,omitempty"`
	Images      []PublicProductImage   `json:"images"`
	Colors      []string               `json:"colors"`
	Sizes       []string               `json:"sizes"`
	Variants    []PublicProductVariant `json:"variants"`
}

type GetPublicProductResponse struct {
	Product *PublicProductDetail `json:"product,omitempty"`
}


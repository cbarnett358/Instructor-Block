/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {isBlobURL} from '@wordpress/blob';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	AlignmentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder


} from '@wordpress/block-editor';
import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	const { content, align, backgroundColor, textColor, cbLink, linkLabel, hasLinkNofollow, url, alt } = attributes;


	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } )
	}
	const onChangeAlign = ( newAlign ) => {
		setAttributes( {
			align: newAlign === undefined ? 'none' : newAlign,
		} )
	}
	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } )
	}

	const onChangeTextColor = ( newTextColor ) => {
		setAttributes( { textColor: newTextColor } )
	}

	const onChangeCbLink = ( newCbLink ) => {
		setAttributes( { cbLink: newCbLink === undefined ? '' : newCbLink } )
	}

	const onChangeLinkLabel = ( newLinkLabel ) => {
		setAttributes( { linkLabel: newLinkLabel === undefined ? '' : newLinkLabel } )
	}

	const toggleNofollow = () => {
		setAttributes( { hasLinkNofollow: ! hasLinkNofollow } )
	}
	const onSelectImage = (image) => {
		if(!image || !image.url) {
			setAttributes({url: undefined, id: undefined, alt: ''});
			return;
		}
		setAttributes( {url: image.url, id: image.id, alt: image.alt});

	};
	return (
		<>

			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'cb-instructors' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text color', 'cb-instructors' )
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Background color', 'cb-instructors' )
						}
					] }
				/>
				<PanelBody
					title={ __( 'Link Settings', 'cb-instructors' )}
					initialOpen={true}
				>

					<PanelRow>

						<fieldset>
							<TextControl
								label={__( 'CB link', 'cb-instructors' )}
								value={ cbLink }
								onChange={ onChangeCbLink }
								help={ __( 'Add your own link', 'cb-instructors' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Link label', 'cb-instructors' )}
								value={ linkLabel }
								onChange={ onChangeLinkLabel }
								help={ __( 'Add link label', 'cb-instructors' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								help={
									hasLinkNofollow
										? 'Has rel nofollow.'
										: 'No rel nofollow.'
								}
								checked={ hasLinkNofollow }
								onChange={ toggleNofollow }
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl
					value={ align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>
				<div{ ...blockProps }>
					{url && <div className={`wp-block-cb-cb-testimonial`}>
						<img src={url} alt={alt}/></div>}

					<MediaPlaceholder
					icon="admin-users"
					onSelect={(val) => console.log(val) }
					onSelectURL={(val) => console.log(val) }
					onError={(err) => console.log(err) }
					accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={url}



					/>


					<RichText

				tagName="p"
				onChange={ onChangeContent }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				value={ content }
				placeholder={ __( 'Write your text...' ) }
				style={ { textAlign: align, backgroundColor: backgroundColor, color: textColor } }
			/>
					<ExternalLink
						href={ cbLink }
						className="cb-button"
						rel={ hasLinkNofollow ? "nofollow" : "" }
					>
						{ linkLabel }
					</ExternalLink>
				</div>
		</>
	);
}

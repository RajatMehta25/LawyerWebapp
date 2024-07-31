import React, { useState, useEffect, Fragment } from 'react'
import { toast } from 'react-toastify'
import { PageContainer, PageTop, TextEditor, Button, SelectBox, Overlay } from '../../components'
import { FlexWrapper } from '../../components/StyledComponents'
import { withTheme } from 'styled-components'
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js'
// import { stateToHTML } from 'draft-js-export-html'
import draftToHtml from 'draftjs-to-html';

import axios from '../../axios'
import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { optionLanguage } from '../../utils/Functions'



const useStyles = makeStyles((theme) => ({
  iconMargin: {
    marginTop: '4.5rem',
  },
  widthClass: {
    width: "100%",
    height: "66%",
  },
  zIndex: {
    zIndex: "5"
  },
  buttonColor: {
    color: "white",
    backgroundColor: "#0294b3 !important",
    marginTop: "0.5rem !important"
  },
  editorColor: {
    margin: "0.3rem !important",
    padding: "0.3rem 1rem !important",
    borderRadius: "0.3rem !important"
  },
}));



function Cms({ ...props }) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false)
  const [editorState, setEditorState] = useState(null)
  const [editorMode, setEditorMode] = useState('editor')
  const [chosenOption, setChosenOption] = useState({
    label: 'Terms & Condition',
    key: "TermsAndConditions",
    value: 2
  })

  const toolbarConfig = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true }
  }
  const options = [
    // {
    //   label: 'Privacy Policy',
    //   key: "PrivacyPolicy",
    //   value: 1
    // },
    {
      label: 'Terms & Condition',
      key: "TermsAndConditions",
      value: 2
    },
    {
      label: 'About Us',
      key: "AboutUs",
      value: 3
    }
  ]

  async function getCms(val) {
    console.log(val.key);
    try {
      setIsLoading(true)
      const { data } = await axios.get(`/admin/getContent?contentHeading=${val.key}`)
      console.log(data);
      const blocksFromHTML = convertFromHTML(data)
      let editorData
      editorData = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      editorData = EditorState.createWithContent(editorData)
      setEditorState(editorData)
      console.log('editorData', editorData)
      setIsLoading(false)
    } catch (error) { }
  };

  useEffect(
    () => {
      getCms({
        label: 'Terms & Condition',
        key: "TermsAndConditions",
        value: 2
      });
      // dataForBusinessCategory();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )


  async function submit(params) {
    try {
      setIsLoading(true)
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const body = draftToHtml(
        rawContentState,
      );

      // if (chosenOption.key === "PrivacyPolicy") {
      //   const { data } = await axios.post('/admin/addUpdateContent?contentHeading=PrivacyPolicy', {
      //     contentText: body,
      //   })
      //   setIsLoading(false)
      //   toast.info(`${data.message}`, {
      //     position: toast.POSITION.TOP_RIGHT
      //   })
      // } 
      if (chosenOption.key === "TermsAndConditions") {
        const { data } = await axios.post('/admin/addUpdateContent?contentHeading=TermsAndConditions', {
          contentText: body,
        })
        setIsLoading(false)
        toast.info(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
      else if (chosenOption.key === "AboutUs") {
        const { data } = await axios.post('/admin/addUpdateContent?contentHeading=AboutUs', {
          contentText: body,
        })
        setIsLoading(false)
        toast.info(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    catch (error) {
      setIsLoading(false)
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (error.response.status === 401) {
        props.history.push('/')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    }
  }

  // console.log(selectBusinessCategory);
  return (
    <div className={classes.iconMargin}>

      <Fragment>
        <PageContainer >
          <PageTop
            title="Content Management"
            component={
              <FlexWrapper width="30%">
                <div style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}>
                  <SelectBox className={classes.zIndex} placeholder="Choose Content" options={options}
                  value={chosenOption}
                    onChange={val => {
                      console.log(val);
                      setChosenOption(val)
                      getCms(val)
                    }}
                  />
                </div>
              </FlexWrapper>
            }
          />
          <FlexWrapper
            direction="row"
            alignItems="center"
            css={`
              > div {
                padding: 14px;
                border: 1px solid #ddd;
                border-bottom: none;
                cursor: pointer;
                :hover {
                  background: #ddd;
                }
              }
            `}>
            <FlexWrapper
              className={classNames(classes.editorColor)}
              onClick={() => setEditorMode('editor')}
              width="auto"
              background={editorMode === 'editor' && '#ddd'}>
              Editor
            </FlexWrapper>
            <FlexWrapper
              className={classNames(classes.editorColor)}
              onClick={() => setEditorMode('preview')}
              width="auto"
              background={editorMode === 'preview' && '#ddd'}>
              Preview
            </FlexWrapper>
          </FlexWrapper>
          {editorMode === 'editor' && (
            <div className={classes.widthClass}>
              <TextEditor
                editorState={editorState}
                editorClassName="demo-editor"
                onEditorStateChange={val => setEditorState(val)}
                toolbar={toolbarConfig}
              />
            </div>
          )}
          {editorMode === 'preview' && (
            <div className={classes.widthClass}>
              <TextEditor toolbar={toolbarConfig} editorState={editorState} toolbarClassName="hide-toolbar" readOnly />
            </div>
          )}
          <Button
            label="Submit"
            css={`
              margin-block-start: 30px;
              margin: auto;
            `}
            className={classes.buttonColor}
            isLoading={isLoading}
            onClick={submit}
            disabled={isEmpty(chosenOption)}
          />
        </PageContainer>
        {isLoading && <Overlay />}
      </Fragment>
    </div>
  )
}

export default withTheme(React.memo(Cms))

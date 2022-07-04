import React, { useRef } from 'react';
import { ReactDiagram } from 'gojs-react';
import * as go from 'gojs';

import './DiagramCmp.css';
import { defaultFont, twiseAsBigFont, twiseAsSmallFont } from '../styles/fonts';
import { TDiagramData } from '../data/dataStore';

type TProps = {
  dataObj: TDiagramData
}

const DiagramCmp = (props: TProps) => {
  const {dataObj} = props
  const $ = go.GraphObject.make;
  const data = {
    ...dataObj,
    modelData: {
      canRelink: true
    },
    skipsDiagramUpdate: false,
  };

  const changeFontSize = (font: string) => (diagram: go.Diagram) => (e: go.InputEvent, obj: go.GraphObject) => {
    diagram.commit(function(d) {
      const contextmenu = obj.part;
      const nodedata = contextmenu?.data;

      d.model.set(nodedata, "font", font);
    }, "changed font size");
  }

  const initDiagram: any = () => {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

    const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  // must be set to allow for model change listening
          'clickCreatingTool.archetypeNodeData': {
            text: 'new node',
            color: 'lightblue',
            font: defaultFont
          },
          layout: $(go.ForceDirectedLayout),
          model: $(go.GraphLinksModel,
            {
              linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
              // positive keys for nodes
              makeUniqueKeyFunction: (m: go.Model, data: any) => {
                let k = data.key || 1;
                while (m.findNodeDataForKey(k)) k++;
                data.key = k;
                return k;
              },
              // negative keys for links
              makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
                let k = data.key || -1;
                while (m.findLinkDataForKey(k)) k--;
                data.key = k;
                return k;
              }
            }),
        });

    const changeFontToBig = changeFontSize(twiseAsBigFont)(diagram)
    const changeFontToSmall = changeFontSize(twiseAsSmallFont)(diagram)

    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
          {
            name: 'SHAPE', fill: 'white', strokeWidth: 0,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color'),
          new go.Binding('figure', 'shape')
        ),
        $(go.TextBlock,
          { margin: 8, editable: true },
          new go.Binding('font', 'font'),
          new go.Binding('text').makeTwoWay()
        ),
        {
          contextMenu:
            $("ContextMenu",
              $("ContextMenuButton",
                {
                  "ButtonBorder.fill": "white",
                },
                $(go.TextBlock, "Change Font Size", { margin: 8}),
                { click: changeFontToBig }
              )
            )
        }
      );

    // relinking depends on modelData
    diagram.linkTemplate =
      $(go.Link,
        new go.Binding('relinkableFrom', 'canRelink').ofModel(),
        new go.Binding('relinkableTo', 'canRelink').ofModel(),
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' }),
        $(go.TextBlock,
          { margin: 8, editable: true },
          new go.Binding('font', 'font'),
          new go.Binding('text').makeTwoWay()
        ),
        {
          contextMenu:
            $("ContextMenu",
              $("ContextMenuButton",
                {
                  "ButtonBorder.fill": "white",
                },
                $(go.TextBlock, "Change Font Size", { margin: 8}),
                { click: changeFontToSmall }
              )
            )
        }
      );

    return diagram;
  }

  const diagramRef = useRef(null);
  return (
    <ReactDiagram
      ref={diagramRef}
      divClassName='diagram-component'
      style={{ backgroundColor: '#eee' }}
      initDiagram={initDiagram}
      nodeDataArray={data.nodeDataArray}
      linkDataArray={data.linkDataArray}
      modelData={data.modelData}
      skipsDiagramUpdate={data.skipsDiagramUpdate}
    />
  );
}

export default DiagramCmp
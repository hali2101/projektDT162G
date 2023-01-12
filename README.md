# projektDT162G---webbtjanst-api-hali2101

### Väderdagbok
API över anteckningar som är loggade och lagrade i databasen. Detta API har stöd för CRUD (create, read, update och delete). 
Där är det möjligt att se och lägga till anteckningar med överskrift, temperatur, nederbörd, vind, luftfuktighet. 
Det går också att uppdatera poster samt radera.

URL:er för att utföra CRUD i detta API:

### Beskrivning hur detta API kan anropas:

| Metod  | Ändpunkt | Beskrivning |
| ------------- | ------------- | ------------- |
| GET | */notes | Hämtar alla anteckningar |
| GET | */notes/ID] | Hämtar enskild anteckning beroende på medskickat ID |
| POST | */notes | Lagrar en ny anteckning |
| PUT | */notes/ID | Uppdaterar anteckning beroende på medskickat ID |
| DELETE | */notes/ID | Raderar anteckning beroende på medskickat ID |

#### Disposition på data som kan skickas till samt returneras från API:et vid ett POST-anrop --->

Skicka till:
```
{  
    "notecreated": "2023-01-10",
    "noteheadline": "Snöig dag",
    "temperature": "-4",
    "precipitation": "Snö 1 dm",
    "humidity": "92 %",
    "wind": "Svag till måttlig"
}
```
Returneras:

```
{
    "_id": "63bd74bcbbd7be2451e9aac6",
    "notecreated": "2023-01-10",
    "noteheadline": "Snöig dag",
    "temperature": "-4",
    "precipitation": "Snö 1 dm",
    "humidity": "92 %",
    "wind": "Svag till måttlig"
}
```

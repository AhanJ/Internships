#include <iostream>
using namespace std;

int main()

{
    int n,i,j,h,w,tw,start1,end1,start2,end2;

    cout << "Enter the Height of the Letters: ";
    cin >> n;

    h = n;
    w = 2 * n;
    tw = 4 * w + 3;

    start1 = w/2 - 1;
    end1 = w/2;

    start2 = (((2 * w) + 2) + ((3 * w) + 1)) / 2;
    end2 = ((((2 * w) + 2) + ((3 * w) + 1)) / 2) + 1; 

    char name[h][tw];
    
    for (i = 0; i < h; i++)

    {
        for (j = 0; j < tw; j++)

        {
            if (j <= w - 1) // for 'A'

            {
                if (i == (h/3) + 1)

                {
                    if (j >= start1 && j <= end1)

                    {
                        name[i][j] = '*';
                    }

                    else

                    {
                        name[i][j] = ' ';
                    }
                }
                
                else if (j == start1)

                {
                    name[i][j] = '*';

                }

                else if (j == end1)

                {
                    name[i][j] = '*';
                }

                else

                {
                    name[i][j] = ' ';
                }
            }

            else if (j >= w + 1 && j <= 2 * w) // for 'H'

            {
                if (j == w + 1 || j == 2 * w || i == h/2)

                {
                    name[i][j] = '*';
                }

                else

                {
                    name[i][j] = ' ';
                }
            }

            else if (j >= (2 * w) + 2 && j <= (3 * w) + 1) // for 'A'

            {
                if (i == (h/3) + 1)

                {
                    if (j >= start2 && j <= end2)

                    {
                        name[i][j] = '*';
                    }

                    else

                    {
                        name[i][j] = ' ';
                    }
                }
                
                else if (j == start2)

                {
                    name[i][j] = '*';

                }

                else if (j == end2)

                {
                    name[i][j] = '*';
                }

                else

                {
                    name[i][j] = ' ';
                }
            }

            else if (j >= (3 * w) + 3 && j <= (4 * w) + 2) // for 'N'

            {
                if (j == (3 * w) + 3 || j == (4 * w) + 2 || (j == (3 * w) + 3 + (2 * i) && i != h - 1))

                {
                    name[i][j] = '*';
                }

                else

                {
                    name[i][j] = ' ';
                }
            }

            else if (j == w || j == (2 * w) + 1 || j == (3 * w) + 2) // for letter spacing

            {
                name[i][j] = ' ';
            }
        }

        if (start1 > 0 && end1 < w - 1)
                
        {
            start1--;
            end1++;
        }

        if (start2 > (2 * w) + 2 && end2 < (3 * w) + 1)
                
        {
            start2--;
            end2++;
        }
    }

    cout << endl;

    for (i = 0; i < h; i++)

    {
        for (j = 0; j < tw; j++)

        {
            cout << name[i][j];
        }

        cout << endl;
    }
}
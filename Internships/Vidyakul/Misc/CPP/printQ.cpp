#include <iostream>
using namespace std;

void printQ (int n)

{
    int wc = n/3;
    int hc = n/3;
    
    int w = n + 1;
    int h = n + 1;


    char Q[h][w];
    
    for (int i = 0; i < h; i++)

    {
        for (int j = 0; j < w; j++)

        {
            if ((j == 0 && i < h - 1 - hc) || (i == 0 && j < w - 1 - wc) || (i == h - 1 - hc && j < w - 1 - wc)  || (j == w - 1 - wc && i < h - 1 - hc) || (i == j) && i >= (w - 1)/2)

            {
                Q[i][j] = '*';
            }

            else 

            {
                Q[i][j] = ' ';
            }
        }
    }

    for (int i = 0; i < h; i++)

    {
        for (int j = 0; j < w; j++)

        {
            cout << Q[i][j] << " ";
        }

        cout << endl;
    }
}

int main()

{
    int n;

    cout << "Enter the Height of the Letter: ";
    cin >> n;

    cout << endl;

    printQ(n);

    return 0;
}